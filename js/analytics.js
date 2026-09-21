// Juniper's own page-view counter (kept in the browser; no network calls).
window.juniperAnalytics = window.juniperAnalytics || { views: [] };
window.juniperAnalytics.views.push({ path: location.pathname, at: Date.now() });
