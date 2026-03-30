(function () {
  "use strict";

  const CONFIG = {
    // Published CSV URL for the Google Sheet tab that powers the app.
    // The parser supports both the richer schema from the build plan and the current compact sheet format.
    sheetCsvUrl:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBLZhIRKXAQsMJZ6xlLaN0YdKQNeHpcR26QGYKKPkCCNhd3kAQyGqrcmbjHiOLXWXrEJppoJzinylZ/pub?output=csv",
    selfLabel: "Brad",
    partnerLabel: "Ryan",
  };

  const COLORS = {
    me: "#1f6fd5",
    partner: "#dd6d43",
    both: "#1a9b79",
    unvisited: "#d6caba",
    border: "#8f7e6a",
    highlight: "#18222d",
    worldFill: "rgba(214, 202, 186, 0.30)",
    worldBorder: "rgba(146, 127, 105, 0.58)",
  };

  const PRIMARY_REQUIRED_COLUMNS = ["country", "year"];
  const ENHANCED_SCHEMA_COLUMNS = ["name", "cityarea", "country", "year", "visitedby"];
  const LEGACY_SCHEMA_COLUMNS = ["name", "area", "country", "year"];

  const COUNTRY_ALIASES = {
    usa: "United States of America",
    us: "United States of America",
    unitedstates: "United States of America",
    unitedstatesofamerica: "United States of America",
    uae: "United Arab Emirates",
    uk: "United Kingdom",
    unitedkingdom: "United Kingdom",
    greatbritain: "United Kingdom",
    britain: "United Kingdom",
    england: "United Kingdom",
    scotland: "United Kingdom",
    wales: "United Kingdom",
    northernireland: "United Kingdom",
    czechrepublic: "Czechia",
    republicofserbia: "Republic of Serbia",
    serbia: "Republic of Serbia",
    macedonia: "North Macedonia",
    southkorea: "South Korea",
    republicofkorea: "South Korea",
    northkorea: "North Korea",
    vietnam: "Vietnam",
    tanzania: "United Republic of Tanzania",
    bahamas: "The Bahamas",
    capeverde: "Cabo Verde",
    caboverde: "Cabo Verde",
    ivorycoast: "Ivory Coast",
    coteivoire: "Ivory Coast",
    drcongo: "Democratic Republic of the Congo",
    democraticrepublicofthecongo: "Democratic Republic of the Congo",
    republicofthecongo: "Republic of the Congo",
    easttimor: "East Timor",
  };

  const interactionModeQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

  const state = {
    map: null,
    worldLayer: null,
    placeLayer: null,
    placeMarkerLayer: null,
    countryNameByKey: new Map(),
    placeBoundaryKeys: new Set(),
    boundaryLayerByKey: new Map(),
    markerLayerByKey: new Map(),
    placeSummariesByKey: new Map(),
    highlightedPlaceKey: null,
    pinnedPlaceKey: null,
    unmatchedCountries: [],
    missingPlaceBoundaries: [],
    skippedRows: 0,
    isPointerMode: interactionModeQuery.matches,
  };

  const elements = {};

  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    cacheElements();
    syncLabels();
    syncInteractionMode();
    bindEvents();

    try {
      const [worldGeoData, placeBoundaryGeoData] = await Promise.all([
        fetchJson("./data/world-countries.geo.json"),
        fetchJson("./data/place-boundaries.geo.json"),
      ]);
      initializeMap(worldGeoData, placeBoundaryGeoData);
      hideLoading();
    } catch (error) {
      console.error(error);
      showBanner("The world or place-boundary map data could not be loaded.", "error");
      hideLoading();
      return;
    }

    if (!CONFIG.sheetCsvUrl) {
      showBanner("Add your published Google Sheet CSV URL in apps/travel-map/app.js to load your travel data.", "warning");
      elements.setupPanel.hidden = false;
      renderPlaceholder();
      updateStats(0, 0);
      return;
    }

    showBanner("Loading travel data from Google Sheets...", "info");

    try {
      const csvText = await fetchText(CONFIG.sheetCsvUrl);
      const parsed = parseSheetRows(csvText);
      state.skippedRows = parsed.skippedRows;
      state.unmatchedCountries = parsed.unmatchedCountries;
      state.placeSummariesByKey = buildPlaceSummaries(parsed.rows);
      state.missingPlaceBoundaries = parsed.rows
        .filter(function findMissing(visit) {
          return !state.placeBoundaryKeys.has(visit.placeKey);
        })
        .map(function toKey(visit) {
          return visit.placeName + ", " + visit.countryRaw;
        })
        .filter(uniqueOnly)
        .sort();

      refreshPlaceStyles();
      renderWarnings();
      renderPlaceholder();
      updateStats(countVisitedCountries(state.placeSummariesByKey), state.placeSummariesByKey.size);

      if (parsed.rows.length === 0) {
        showBanner("The sheet loaded successfully, but there were no valid visit rows to display yet.", "warning");
        return;
      }

      if (state.unmatchedCountries.length > 0 || state.missingPlaceBoundaries.length > 0 || state.skippedRows > 0) {
        const messages = [];
        if (state.missingPlaceBoundaries.length > 0) {
          messages.push(state.missingPlaceBoundaries.length + " place boundary" + plural(state.missingPlaceBoundaries.length) + " missing");
        }
        if (state.unmatchedCountries.length > 0) {
          messages.push(state.unmatchedCountries.length + " country alias" + plural(state.unmatchedCountries.length) + " missing");
        }
        if (state.skippedRows > 0) {
          messages.push(state.skippedRows + " incomplete row" + plural(state.skippedRows) + " skipped");
        }
        showBanner(messages.join("; ") + ".", "warning");
        return;
      }

      hideBanner();
    } catch (error) {
      console.error(error);
      showBanner(error.message || "Travel data could not be loaded from the published sheet.", "error");
      elements.setupPanel.hidden = false;
      renderPlaceholder();
      updateStats(0, 0);
    }
  }

  function cacheElements() {
    elements.loading = document.getElementById("map-loading");
    elements.statusBanner = document.getElementById("status-banner");
    elements.warningPanel = document.getElementById("warning-panel");
    elements.warningSummary = document.getElementById("warning-summary");
    elements.warningList = document.getElementById("warning-list");
    elements.detailPanel = document.getElementById("detail-panel");
    elements.detailCountry = document.getElementById("detail-country");
    elements.detailChip = document.getElementById("detail-chip");
    elements.detailSubtitle = document.getElementById("detail-subtitle");
    elements.detailNote = document.getElementById("detail-note");
    elements.detailGroups = document.getElementById("detail-groups");
    elements.detailClose = document.getElementById("detail-close");
    elements.setupPanel = document.getElementById("setup-panel");
    elements.statCountries = document.getElementById("stat-countries");
    elements.statPlaces = document.getElementById("stat-places");
    elements.legendMe = document.getElementById("legend-me-label");
    elements.legendPartner = document.getElementById("legend-partner-label");
  }

  function bindEvents() {
    interactionModeQuery.addEventListener("change", syncInteractionMode);
    elements.detailClose.addEventListener("click", clearPinnedPlace);
  }

  function syncLabels() {
    elements.legendMe.textContent = CONFIG.selfLabel;
    elements.legendPartner.textContent = CONFIG.partnerLabel;
  }

  function syncInteractionMode() {
    state.isPointerMode = interactionModeQuery.matches;
    renderPlaceholder();
    updateMobilePanelState();
  }

  function initializeMap(worldGeoData, placeBoundaryGeoData) {
    buildCountryIndex(worldGeoData.features);

    state.map = L.map("map", {
      zoomControl: false,
      attributionControl: true,
      minZoom: 1.4,
      maxZoom: 12,
      worldCopyJump: false,
    });

    state.map.attributionControl.setPrefix("");
    state.map.attributionControl.addAttribution(
      '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
    );

    L.control.zoom({ position: "bottomright" }).addTo(state.map);

    state.worldLayer = L.geoJSON(worldGeoData, {
      style: getWorldStyle,
      interactive: false,
    }).addTo(state.map);

    state.placeLayer = L.geoJSON(placeBoundaryGeoData, {
      style: stylePlaceFeature,
      onEachFeature(feature, layer) {
        const properties = feature.properties || {};
        layer.placeKey = properties.placeKey;
        layer.placeName = properties.placeName;
        state.placeBoundaryKeys.add(properties.placeKey);
        state.boundaryLayerByKey.set(properties.placeKey, layer);

        layer.on({
          mouseover: function handleMouseOver() {
            if (!state.isPointerMode) {
              return;
            }
            highlightPlace(layer.placeKey);
            renderPlace(layer.placeKey);
          },
          mouseout: function handleMouseOut() {
            if (!state.isPointerMode) {
              return;
            }
            if (state.highlightedPlaceKey === layer.placeKey) {
              resetPlaceHighlight(layer.placeKey);
            }
            if (!state.pinnedPlaceKey) {
              renderPlaceholder();
            }
          },
          click: function handleClick() {
            if (state.isPointerMode) {
              return;
            }
            setPinnedPlace(layer.placeKey);
          },
        });
      },
    }).addTo(state.map);

    state.placeMarkerLayer = L.layerGroup();
    placeBoundaryGeoData.features.forEach(function eachFeature(feature) {
      const properties = feature.properties || {};
      const marker = L.circleMarker(L.geoJSON(feature).getBounds().getCenter(), getMarkerStyle(properties.placeKey, false));
      marker.placeKey = properties.placeKey;
      marker.placeName = properties.placeName;
      state.markerLayerByKey.set(properties.placeKey, marker);

      marker.on({
        mouseover: function handleMouseOver() {
          if (!state.isPointerMode) {
            return;
          }
          highlightPlace(marker.placeKey);
          renderPlace(marker.placeKey);
        },
        mouseout: function handleMouseOut() {
          if (!state.isPointerMode) {
            return;
          }
          if (state.highlightedPlaceKey === marker.placeKey) {
            resetPlaceHighlight(marker.placeKey);
          }
          if (!state.pinnedPlaceKey) {
            renderPlaceholder();
          }
        },
        click: function handleClick() {
          if (state.isPointerMode) {
            return;
          }
          setPinnedPlace(marker.placeKey);
        },
      });

      marker.addTo(state.placeMarkerLayer);
    });
    state.placeMarkerLayer.addTo(state.map);

    const bounds = state.worldLayer.getBounds();
    state.map.fitBounds(bounds.pad(0.04));
    state.map.setMaxBounds(bounds.pad(0.08));
  }

  function buildCountryIndex(features) {
    state.countryNameByKey.clear();
    features.forEach(function eachFeature(feature) {
      const name = feature.properties && feature.properties.name ? feature.properties.name : "";
      const key = normalizeLookup(name);
      if (key) {
        state.countryNameByKey.set(key, name);
      }
    });
  }

  function getWorldStyle() {
    return {
      color: COLORS.worldBorder,
      weight: 0.9,
      opacity: 0.78,
      fillColor: COLORS.unvisited,
      fillOpacity: 0.34,
    };
  }

  function hideLoading() {
    elements.loading.hidden = true;
  }

  function showBanner(message, level) {
    elements.statusBanner.hidden = false;
    elements.statusBanner.textContent = message;
    elements.statusBanner.className = "map-overlay map-overlay--status";
    if (level === "error") {
      elements.statusBanner.classList.add("is-error");
    } else if (level === "warning") {
      elements.statusBanner.classList.add("is-warning");
    }
  }

  function hideBanner() {
    elements.statusBanner.hidden = true;
    elements.statusBanner.textContent = "";
    elements.statusBanner.className = "map-overlay map-overlay--status";
  }

  function updateStats(countryCount, placeCount) {
    elements.statCountries.textContent = String(countryCount);
    elements.statPlaces.textContent = String(placeCount);
  }

  async function fetchJson(url) {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Unable to load JSON from " + url);
    }
    return response.json();
  }

  async function fetchText(url) {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("The published Google Sheet could not be fetched. Check that the URL is correct and public.");
    }

    const text = await response.text();
    if (!text.trim()) {
      throw new Error("The published Google Sheet returned an empty response.");
    }
    if (/^\s*<!doctype html/i.test(text) || /^\s*<html/i.test(text)) {
      throw new Error("The published sheet returned HTML instead of CSV. Use the published CSV URL for a single sheet tab.");
    }
    return text;
  }

  function parseSheetRows(csvText) {
    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: "greedy",
      transformHeader(header) {
        return normalizeLookup(header);
      },
    });

    if (result.errors && result.errors.length > 0) {
      throw new Error("The published CSV could not be parsed: " + result.errors[0].message);
    }

    const fields = (result.meta && result.meta.fields) || [];
    const missingBaseColumns = PRIMARY_REQUIRED_COLUMNS.filter(function findMissing(column) {
      return !fields.includes(column);
    });

    if (missingBaseColumns.length > 0) {
      throw new Error("The published sheet must include at least Country and Year columns.");
    }

    const hasEnhancedSchema = ENHANCED_SCHEMA_COLUMNS.every(function hasColumn(column) {
      return fields.includes(column);
    });
    const hasLegacySchema = LEGACY_SCHEMA_COLUMNS.every(function hasColumn(column) {
      return fields.includes(column);
    });

    if (!hasEnhancedSchema && !hasLegacySchema) {
      throw new Error(
        "The published sheet must use either the full schema (Name, City/Area, Country, Year, Visited By) or the current compact schema (Name, Area, Country, Year)."
      );
    }

    const rows = [];
    const unmatchedCountries = new Set();
    let skippedRows = 0;

    result.data.forEach(function eachRow(rawRow) {
      if (!rawRow || isBlankRow(rawRow)) {
        return;
      }

      const countryRaw = tidyCell(rawRow.country);
      const placeName = hasEnhancedSchema ? tidyCell(rawRow.name) : tidyCell(rawRow.area);
      const cityArea = hasEnhancedSchema ? tidyCell(rawRow.cityarea) : "";
      const visitedBy = normalizeVisitedBy(hasEnhancedSchema ? rawRow.visitedby : rawRow.name);

      if (!countryRaw || !placeName || !visitedBy) {
        skippedRows += 1;
        return;
      }

      const countryCanonical = resolveCountryName(countryRaw);
      if (!countryCanonical) {
        unmatchedCountries.add(countryRaw);
        return;
      }

      rows.push({
        name: placeName,
        cityArea: cityArea,
        countryRaw: countryRaw,
        countryCanonical: countryCanonical,
        year: tidyCell(rawRow.year),
        visitedBy: visitedBy,
        placeName: placeName,
        placeKey: buildPlaceKey(placeName, countryCanonical),
      });
    });

    rows.sort(compareVisits);

    return {
      rows: rows,
      unmatchedCountries: Array.from(unmatchedCountries).sort(),
      skippedRows: skippedRows,
    };
  }

  function isBlankRow(row) {
    return Object.keys(row).every(function everyKey(key) {
      return !tidyCell(row[key]);
    });
  }

  function tidyCell(value) {
    return String(value == null ? "" : value).trim();
  }

  function normalizeVisitedBy(value) {
    const key = normalizeLookup(value);
    if (!key) {
      return null;
    }
    if (key === normalizeLookup(CONFIG.selfLabel) || key === "me") {
      return "me";
    }
    if (key === normalizeLookup(CONFIG.partnerLabel) || key === "partner") {
      return "partner";
    }
    if (key === "both" || key === "together") {
      return "both";
    }
    return null;
  }

  function resolveCountryName(rawCountry) {
    const normalized = normalizeLookup(rawCountry);
    if (!normalized) {
      return null;
    }

    if (state.countryNameByKey.has(normalized)) {
      return state.countryNameByKey.get(normalized);
    }

    const aliasTarget = COUNTRY_ALIASES[normalized];
    if (aliasTarget) {
      const aliasKey = normalizeLookup(aliasTarget);
      if (state.countryNameByKey.has(aliasKey)) {
        return state.countryNameByKey.get(aliasKey);
      }
    }

    const withoutLeadingThe = normalized.replace(/^the/, "");
    if (withoutLeadingThe && state.countryNameByKey.has(withoutLeadingThe)) {
      return state.countryNameByKey.get(withoutLeadingThe);
    }

    return null;
  }

  function buildPlaceSummaries(rows) {
    const summaries = new Map();

    rows.forEach(function eachVisit(visit) {
      if (!summaries.has(visit.placeKey)) {
        summaries.set(visit.placeKey, {
          placeKey: visit.placeKey,
          placeName: visit.placeName,
          countryCanonical: visit.countryCanonical,
          status: "unvisited",
          hasTogetherVisit: false,
          hasMeVisit: false,
          hasPartnerVisit: false,
          visits: [],
        });
      }

      const summary = summaries.get(visit.placeKey);
      summary.visits.push(visit);

      if (visit.visitedBy === "both") {
        summary.hasTogetherVisit = true;
        summary.hasMeVisit = true;
        summary.hasPartnerVisit = true;
      } else if (visit.visitedBy === "me") {
        summary.hasMeVisit = true;
      } else if (visit.visitedBy === "partner") {
        summary.hasPartnerVisit = true;
      }
    });

    summaries.forEach(function eachSummary(summary) {
      if (summary.hasMeVisit && summary.hasPartnerVisit) {
        summary.status = "both";
      } else if (summary.hasMeVisit) {
        summary.status = "me";
      } else if (summary.hasPartnerVisit) {
        summary.status = "partner";
      } else {
        summary.status = "unvisited";
      }
    });

    return summaries;
  }

  function countVisitedCountries(summaries) {
    return new Set(
      Array.from(summaries.values()).map(function eachSummary(summary) {
        return summary.countryCanonical;
      })
    ).size;
  }

  function compareVisits(left, right) {
    return extractYearRank(right.year) - extractYearRank(left.year) || left.placeKey.localeCompare(right.placeKey);
  }

  function extractYearRank(yearValue) {
    const match = String(yearValue || "").match(/(19|20)\d{2}/);
    return match ? Number(match[0]) : -Infinity;
  }

  function buildPlaceKey(placeName, countryCanonical) {
    return normalizeLookup(placeName) + "::" + normalizeLookup(countryCanonical);
  }

  function stylePlaceFeature(feature) {
    return getPlaceStyle(feature.properties.placeKey, false);
  }

  function getPlaceStyle(placeKey, isActive) {
    const summary = state.placeSummariesByKey.get(placeKey);
    const status = summary ? summary.status : "unvisited";
    const fillColor = COLORS[status] || COLORS.unvisited;
    const isMapped = Boolean(summary);

    return {
      color: isActive ? COLORS.highlight : fillColor,
      weight: isActive ? 2.1 : isMapped ? 1.4 : 0.7,
      opacity: isActive ? 0.98 : isMapped ? 0.95 : 0.25,
      fillColor: fillColor,
      fillOpacity: isActive ? 0.92 : isMapped ? 0.8 : 0.06,
    };
  }

  function getMarkerStyle(placeKey, isActive) {
    const summary = state.placeSummariesByKey.get(placeKey);
    const status = summary ? summary.status : "unvisited";
    const color = COLORS[status] || COLORS.unvisited;

    return {
      color: isActive ? COLORS.highlight : "#ffffff",
      weight: isActive ? 2.2 : 1.4,
      radius: isActive ? 7.5 : 6,
      fillColor: color,
      fillOpacity: 0.95,
      opacity: 1,
    };
  }

  function refreshPlaceStyles() {
    if (!state.placeLayer) {
      return;
    }

    state.placeLayer.eachLayer(function eachLayer(layer) {
      layer.setStyle(getPlaceStyle(layer.placeKey, state.highlightedPlaceKey === layer.placeKey));
    });

    if (state.placeMarkerLayer) {
      state.placeMarkerLayer.eachLayer(function eachLayer(layer) {
        layer.setStyle(getMarkerStyle(layer.placeKey, state.highlightedPlaceKey === layer.placeKey));
      });
    }
  }

  function highlightPlace(placeKey) {
    if (!placeKey) {
      return;
    }
    if (state.highlightedPlaceKey && state.highlightedPlaceKey !== placeKey) {
      resetPlaceHighlight(state.highlightedPlaceKey);
    }
    state.highlightedPlaceKey = placeKey;
    applyPlaceActiveStyles(placeKey, true);
  }

  function resetPlaceHighlight(placeKey) {
    if (!placeKey) {
      return;
    }
    applyPlaceActiveStyles(placeKey, false);
    if (state.highlightedPlaceKey === placeKey) {
      state.highlightedPlaceKey = null;
    }
  }

  function applyPlaceActiveStyles(placeKey, isActive) {
    const boundaryLayer = state.boundaryLayerByKey.get(placeKey);
    const markerLayer = state.markerLayerByKey.get(placeKey);

    if (boundaryLayer) {
      boundaryLayer.setStyle(getPlaceStyle(placeKey, isActive));
      if (isActive) {
        boundaryLayer.bringToFront();
      }
    }

    if (markerLayer) {
      markerLayer.setStyle(getMarkerStyle(placeKey, isActive));
      if (isActive) {
        markerLayer.bringToFront();
      }
    }
  }

  function setPinnedPlace(placeKey) {
    state.pinnedPlaceKey = placeKey;
    renderPlace(placeKey);
    updateMobilePanelState(true);
  }

  function clearPinnedPlace() {
    state.pinnedPlaceKey = null;
    if (state.highlightedPlaceKey) {
      resetPlaceHighlight(state.highlightedPlaceKey);
    }
    renderPlaceholder();
  }

  function renderWarnings() {
    elements.warningList.innerHTML = "";
    const issues = [];

    state.missingPlaceBoundaries.forEach(function eachPlace(label) {
      issues.push("Boundary missing: " + label);
    });
    state.unmatchedCountries.forEach(function eachCountry(label) {
      issues.push("Country alias missing: " + label);
    });

    if (issues.length === 0) {
      elements.warningPanel.hidden = true;
      elements.warningSummary.textContent = "";
      return;
    }

    issues.forEach(function eachIssue(issue) {
      const item = document.createElement("li");
      item.textContent = issue;
      elements.warningList.appendChild(item);
    });

    elements.warningSummary.textContent =
      "Update the sheet values or rerun node apps/travel-map/scripts/generate-place-boundaries.mjs to refresh the local place-boundary dataset.";
    elements.warningPanel.hidden = false;
  }

  function renderPlaceholder() {
    elements.detailNote.hidden = true;
    elements.detailNote.textContent = "";
    elements.detailGroups.innerHTML = "";
    elements.detailClose.hidden = state.isPointerMode;

    if (state.pinnedPlaceKey) {
      renderPlace(state.pinnedPlaceKey);
      return;
    }

    elements.detailCountry.textContent = "Explore the map";
    elements.detailChip.textContent = "Waiting for travel data";
    elements.detailChip.dataset.status = "unvisited";

    if (state.isPointerMode) {
      elements.detailSubtitle.textContent = "Hover over a highlighted place boundary to inspect who visited and when.";
    } else {
      elements.detailSubtitle.textContent = "Tap a highlighted place boundary to pin its details here, then close the panel when you want the map back.";
    }

    updateMobilePanelState(Boolean(!state.isPointerMode && (!CONFIG.sheetCsvUrl || !elements.setupPanel.hidden)));
  }

  function renderPlace(placeKey) {
    const summary = state.placeSummariesByKey.get(placeKey);

    if (!summary) {
      renderPlaceholder();
      return;
    }

    elements.detailCountry.textContent = summary.placeName;
    elements.detailChip.textContent = getChipLabel(summary.status);
    elements.detailChip.dataset.status = summary.status;
    elements.detailSubtitle.textContent =
      summary.countryCanonical +
      " • " +
      summary.visits.length +
      " visit" +
      plural(summary.visits.length);
    elements.detailNote.hidden = true;
    elements.detailNote.textContent = "";
    elements.setupPanel.hidden = Boolean(CONFIG.sheetCsvUrl);
    elements.detailClose.hidden = state.isPointerMode;

    renderVisitGroups(summary);
    updateMobilePanelState(Boolean(!state.isPointerMode));
  }

  function renderVisitGroups(summary) {
    const groups = [
      {
        title: "Together",
        visits: summary.visits.filter(function isTogether(visit) {
          return visit.visitedBy === "both";
        }),
      },
      {
        title: CONFIG.selfLabel + " only",
        visits: summary.visits.filter(function isMe(visit) {
          return visit.visitedBy === "me";
        }),
      },
      {
        title: CONFIG.partnerLabel + " only",
        visits: summary.visits.filter(function isPartner(visit) {
          return visit.visitedBy === "partner";
        }),
      },
    ];

    elements.detailGroups.innerHTML = "";

    if (summary.status === "both" && !summary.hasTogetherVisit) {
      elements.detailNote.hidden = false;
      elements.detailNote.textContent =
        "Both of you have visited this place, but the sheet only shows separate trips here, not a shared visit row.";
    }

    groups.forEach(function eachGroup(group) {
      if (group.visits.length === 0) {
        return;
      }

      const section = document.createElement("section");
      section.className = "visit-group";

      const heading = document.createElement("div");
      heading.className = "visit-group__heading";

      const title = document.createElement("h3");
      title.textContent = group.title;

      const count = document.createElement("span");
      count.className = "visit-group__count";
      count.textContent = group.visits.length + " visit" + plural(group.visits.length);

      heading.appendChild(title);
      heading.appendChild(count);
      section.appendChild(heading);
      section.appendChild(buildVisitList(group.visits));
      elements.detailGroups.appendChild(section);
    });
  }

  function buildVisitList(visits) {
    const list = document.createElement("ul");
    list.className = "visit-list";

    visits.sort(compareVisits).forEach(function eachVisit(visit) {
      const item = document.createElement("li");
      item.className = "visit-item";

      const textWrap = document.createElement("div");
      const title = document.createElement("p");
      title.className = "visit-item__title";
      title.textContent = visit.name || visit.placeName || visit.countryCanonical;

      const meta = document.createElement("p");
      meta.className = "visit-item__meta";
      meta.textContent = visit.cityArea ? visit.cityArea + " • " + visit.countryCanonical : visit.countryCanonical;

      const year = document.createElement("span");
      year.className = "visit-item__year";
      year.textContent = visit.year || "Unknown";

      textWrap.appendChild(title);
      textWrap.appendChild(meta);
      item.appendChild(textWrap);
      item.appendChild(year);
      list.appendChild(item);
    });

    return list;
  }

  function getChipLabel(status) {
    if (status === "me") {
      return CONFIG.selfLabel + " only";
    }
    if (status === "partner") {
      return CONFIG.partnerLabel + " only";
    }
    if (status === "both") {
      return "Both visited";
    }
    return "Unvisited";
  }

  function updateMobilePanelState(forceOpen) {
    if (state.isPointerMode) {
      elements.detailPanel.dataset.mobileOpen = "true";
      return;
    }

    const shouldOpen =
      typeof forceOpen === "boolean"
        ? forceOpen
        : Boolean(state.pinnedPlaceKey || !CONFIG.sheetCsvUrl || !elements.setupPanel.hidden);
    elements.detailPanel.dataset.mobileOpen = shouldOpen ? "true" : "false";
  }

  function normalizeLookup(value) {
    return String(value == null ? "" : value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "");
  }

  function uniqueOnly(value, index, array) {
    return array.indexOf(value) === index;
  }

  function plural(count) {
    return count === 1 ? "" : "s";
  }
})();
