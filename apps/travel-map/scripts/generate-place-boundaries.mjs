import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const Papa = require("../lib/papaparse.min.js");

const APP_DIR = path.resolve(import.meta.dirname, "..");
const DATA_DIR = path.join(APP_DIR, "data");
const WORLD_GEOJSON_PATH = path.join(DATA_DIR, "world-countries.geo.json");
const APP_JS_PATH = path.join(APP_DIR, "app.js");
const OUTPUT_GEOJSON_PATH = path.join(DATA_DIR, "place-boundaries.geo.json");
const OUTPUT_REPORT_PATH = path.join(DATA_DIR, "place-boundaries.report.json");
const OVERRIDES_PATH = path.join(DATA_DIR, "place-boundary-overrides.json");
const FORCE_REFRESH = process.argv.includes("--refresh");

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

const WORLD_COUNTRIES = JSON.parse(await fs.readFile(WORLD_GEOJSON_PATH, "utf8"));
const COUNTRY_NAME_BY_KEY = new Map(
  WORLD_COUNTRIES.features
    .map((feature) => feature?.properties?.name)
    .filter(Boolean)
    .map((name) => [normalizeLookup(name), name])
);

const sheetCsvUrl = await readSheetUrlFromAppConfig();
const overrides = await readJsonFile(OVERRIDES_PATH, {});
const existingGeoJson = await readJsonFile(OUTPUT_GEOJSON_PATH, { type: "FeatureCollection", features: [] });
const existingReport = await readJsonFile(OUTPUT_REPORT_PATH, { generatedAt: null, places: [] });
const cachedFeatureByKey = new Map(existingGeoJson.features.map((feature) => [feature.properties.placeKey, feature]));
const cachedReportByKey = new Map(existingReport.places.map((entry) => [entry.placeKey, entry]));

const csvText = await fetchText(sheetCsvUrl);
const rows = parseSheetRows(csvText);
const uniquePlaces = dedupePlaces(rows);
const reportEntries = [];
const features = [];

for (const place of uniquePlaces) {
  const override = overrides[place.placeKey] || {};
  const query = override.query || `${place.placeName}, ${place.countryRaw}`;
  const cacheKey = place.placeKey;
  const cachedFeature = cachedFeatureByKey.get(cacheKey);
  const cachedReport = cachedReportByKey.get(cacheKey);

  if (!FORCE_REFRESH && cachedFeature && cachedReport && cachedReport.query === query) {
    features.push(cachedFeature);
    reportEntries.push(cachedReport);
    continue;
  }

  const searchResults = await searchNominatim(query, override.countryCode || "");
  const bestMatch = chooseBestResult(searchResults, place, override);
  if (!bestMatch) {
    reportEntries.push({
      placeKey: place.placeKey,
      placeName: place.placeName,
      countryRaw: place.countryRaw,
      countryCanonical: place.countryCanonical,
      query,
      matched: false,
      reason: "No polygon result matched this place",
      candidates: searchResults.map(summarizeCandidate),
    });
    continue;
  }

  features.push({
    type: "Feature",
    geometry: bestMatch.geojson,
    properties: {
      placeKey: place.placeKey,
      placeName: place.placeName,
      countryRaw: place.countryRaw,
      countryCanonical: place.countryCanonical,
      query,
      displayName: bestMatch.display_name,
      category: bestMatch.category || null,
      type: bestMatch.type || null,
      osmType: bestMatch.osm_type || null,
      osmId: bestMatch.osm_id || null,
    },
  });

  reportEntries.push({
    placeKey: place.placeKey,
    placeName: place.placeName,
    countryRaw: place.countryRaw,
    countryCanonical: place.countryCanonical,
    query,
    matched: true,
    selected: summarizeCandidate(bestMatch),
    candidates: searchResults.map(summarizeCandidate),
  });

  await sleep(1100);
}

await fs.writeFile(
  OUTPUT_GEOJSON_PATH,
  JSON.stringify(
    {
      type: "FeatureCollection",
      features,
    },
    null,
    2
  ) + "\n"
);

await fs.writeFile(
  OUTPUT_REPORT_PATH,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      sourceSheet: sheetCsvUrl,
      placeCount: uniquePlaces.length,
      matchedCount: reportEntries.filter((entry) => entry.matched).length,
      unmatchedCount: reportEntries.filter((entry) => !entry.matched).length,
      places: reportEntries,
    },
    null,
    2
  ) + "\n"
);

const unmatched = reportEntries.filter((entry) => !entry.matched);
console.log(`Generated ${features.length} place boundaries from ${uniquePlaces.length} unique places.`);
if (unmatched.length > 0) {
  console.log("Unmatched places:");
  unmatched.forEach((entry) => console.log(`- ${entry.placeName}, ${entry.countryRaw}`));
  process.exitCode = 1;
}

async function readSheetUrlFromAppConfig() {
  const source = await fs.readFile(APP_JS_PATH, "utf8");
  const match = source.match(/sheetCsvUrl:\s*"([^"]+)"/);
  if (!match || !match[1]) {
    throw new Error("Could not find sheetCsvUrl in apps/travel-map/app.js");
  }
  return match[1];
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "b-kennedy0-travel-map-builder/1.0",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch sheet CSV from ${url}`);
  }
  const text = await response.text();
  if (/^\s*<!doctype html/i.test(text) || /^\s*<html/i.test(text)) {
    throw new Error("The published sheet returned HTML instead of CSV.");
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

  if (result.errors.length > 0) {
    throw new Error(result.errors[0].message);
  }

  const fields = result.meta.fields || [];
  const hasEnhancedSchema = ["name", "cityarea", "country", "year", "visitedby"].every((field) => fields.includes(field));
  const hasLegacySchema = ["name", "area", "country", "year"].every((field) => fields.includes(field));
  if (!hasEnhancedSchema && !hasLegacySchema) {
    throw new Error("Sheet schema did not match the supported travel-map formats.");
  }

  return result.data
    .filter((row) => row && Object.values(row).some((value) => String(value || "").trim()))
    .map((row) => {
      const countryRaw = tidyCell(row.country);
      const placeName = hasEnhancedSchema ? tidyCell(row.name) : tidyCell(row.area);
      const countryCanonical = resolveCountryName(countryRaw);
      return {
        placeName,
        countryRaw,
        countryCanonical,
        placeKey: buildPlaceKey(placeName, countryCanonical),
      };
    })
    .filter((row) => row.placeName && row.countryCanonical);
}

function dedupePlaces(rows) {
  const seen = new Set();
  return rows.filter((row) => {
    if (seen.has(row.placeKey)) {
      return false;
    }
    seen.add(row.placeKey);
    return true;
  });
}

async function searchNominatim(query, countryCode) {
  const params = new URLSearchParams({
    q: query,
    format: "jsonv2",
    limit: "5",
    polygon_geojson: "1",
    polygon_threshold: "0.001",
    addressdetails: "1",
    dedupe: "0",
  });
  if (countryCode) {
    params.set("countrycodes", countryCode);
  }

  const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`, {
    headers: {
      "User-Agent": "b-kennedy0-travel-map-builder/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Nominatim search failed for query "${query}"`);
  }

  return response.json();
}

function chooseBestResult(results, place, override) {
  if (override.displayName) {
    const overrideKey = normalizeLookup(override.displayName);
    const exact = results.find((candidate) => normalizeLookup(candidate.display_name) === overrideKey);
    if (exact && hasPolygon(exact)) {
      return exact;
    }
  }

  const ranked = results
    .filter(hasPolygon)
    .map((candidate) => ({
      candidate,
      score: scoreCandidate(candidate, place),
    }))
    .sort((left, right) => right.score - left.score);

  return ranked.length > 0 ? ranked[0].candidate : null;
}

function scoreCandidate(candidate, place) {
  const displayName = normalizeLookup(candidate.display_name);
  const countryNormalized = normalizeLookup(place.countryCanonical);
  const placeNormalized = normalizeLookup(place.placeName);
  const address = candidate.address || {};

  let score = 0;

  if (displayName.includes(placeNormalized)) {
    score += 40;
  }
  if (displayName.includes(countryNormalized)) {
    score += 25;
  }

  const addressValues = Object.values(address).map((value) => normalizeLookup(value));
  if (addressValues.includes(placeNormalized)) {
    score += 35;
  }
  if (addressValues.includes(countryNormalized)) {
    score += 25;
  }

  const preferredTypes = new Set(["administrative", "city", "town", "village", "borough", "municipality", "island", "suburb"]);
  if (preferredTypes.has(candidate.type)) {
    score += 15;
  }

  if (candidate.geojson?.type === "Polygon") {
    score += 5;
  }

  return score;
}

function summarizeCandidate(candidate) {
  return {
    displayName: candidate.display_name,
    category: candidate.category || null,
    type: candidate.type || null,
    osmType: candidate.osm_type || null,
    osmId: candidate.osm_id || null,
    geojsonType: candidate.geojson?.type || null,
  };
}

function hasPolygon(candidate) {
  return candidate && candidate.geojson && (candidate.geojson.type === "Polygon" || candidate.geojson.type === "MultiPolygon");
}

function buildPlaceKey(placeName, countryCanonical) {
  return `${normalizeLookup(placeName)}::${normalizeLookup(countryCanonical)}`;
}

function resolveCountryName(rawCountry) {
  const normalized = normalizeLookup(rawCountry);
  if (!normalized) {
    return "";
  }
  if (COUNTRY_NAME_BY_KEY.has(normalized)) {
    return COUNTRY_NAME_BY_KEY.get(normalized);
  }
  const aliasTarget = COUNTRY_ALIASES[normalized];
  if (aliasTarget && COUNTRY_NAME_BY_KEY.has(normalizeLookup(aliasTarget))) {
    return COUNTRY_NAME_BY_KEY.get(normalizeLookup(aliasTarget));
  }
  return "";
}

function normalizeLookup(value) {
  return String(value == null ? "" : value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "");
}

function tidyCell(value) {
  return String(value == null ? "" : value).trim();
}

async function readJsonFile(filePath, fallback) {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") {
      return fallback;
    }
    throw error;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
