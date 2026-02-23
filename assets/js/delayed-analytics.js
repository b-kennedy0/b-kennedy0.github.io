---
---
(function() {
  var measurementId = "{{ site.gtag_measurement_id | default: '' }}";
  if (!measurementId) return;

  function getCookie(name) {
    var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : "";
  }

  function loadGtag() {
    if (window.__gtagLoaded) return;
    window.__gtagLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function() {
      window.dataLayer.push(arguments);
    };

    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
    document.head.appendChild(script);

    window.gtag("js", new Date());
    window.gtag("config", measurementId, { anonymize_ip: true });
  }

  function scheduleGtagLoad() {
    if (getCookie("cookiebar") === "CookieDisallowed") return;

    if ("requestIdleCallback" in window) {
      requestIdleCallback(loadGtag, { timeout: 2500 });
      return;
    }

    window.setTimeout(loadGtag, 1500);
  }

  if (document.readyState === "complete") {
    scheduleGtagLoad();
  } else {
    window.addEventListener("load", scheduleGtagLoad, { once: true });
  }

  document.addEventListener("click", function(event) {
    var target = event.target;
    if (target && target.id === "cookie-bar-button") {
      window.setTimeout(scheduleGtagLoad, 100);
    }
  }, true);
})();
