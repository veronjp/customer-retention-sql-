// ---------- helpers ----------
function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(",").map(h => h.trim());
  return lines.slice(1).filter(Boolean).map(line => {
    const cols = line.split(",").map(c => c.trim());
    const row = {};
    headers.forEach((h, i) => row[h] = cols[i]);
    return row;
  });
}

function showError(elId, msg) {
  const el = document.getElementById(elId);
  if (el) el.innerHTML = `<div style="color:#fca5a5;padding:12px;">${msg}</div>`;
}

async function fetchText(path) {
  const url = new URL(path, window.location.href).toString();
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Fetch failed ${res.status}: ${url}`);
  return await res.text();
}

// ---------- KPI cards ----------
function formatValue(v, format) {
  if (format === "percent") return (v * 100).toFixed(1) + "%";
  if (format === "currency") {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);
  }
  return String(v);
}

function prettyTitle(kpi) {
  return {
    "30_day_retention_rate": "30-Day Retention Rate",
    "repeat_purchase_rate": "Repeat Purchase Rate",
    "avg_days_to_second_purchase": "Avg Days to 2nd Purchase",
    "avg_clv_proxy": "Avg CLV (Proxy)"
  }[kpi] || kpi;
}

function subtitleText(kpi) {
  return {
    "30_day_retention_rate": "Customers active ≥30 days after first purchase",
    "repeat_purchase_rate": "Customers with 2+ orders",
    "avg_days_to_second_purchase": "Among repeat customers only",
    "avg_clv_proxy": "Historical revenue per customer"
  }[kpi] || "";
}

async function loadKpiCards() {
  const text = await fetchText("./outputs/kpi_cards.csv");
  const rows = parseCSV(text).map(r => ({
    kpi: r.kpi,
    value: Number(r.value),
    format: r.format
  }));

  const grid = document.getElementById("kpiGrid");
  grid.innerHTML = "";

  rows.forEach(r => {
    const card = document.createElement("div");
    card.className = "kpi-card";

    const title = document.createElement("div");
    title.className = "kpi-title";
    title.textContent = prettyTitle(r.kpi);

    const value = document.createElement("div");
    value.className = "kpi-value";
    value.textContent = formatValue(r.value, r.format);

    const sub = document.createElement("div");
    sub.className = "kpi-sub";
    sub.textContent = subtitleText(r.kpi);

    card.appendChild(title);
    card.appendChild(value);
    card.appendChild(sub);
    grid.appendChild(card);
  });
}

// ---------- charts ----------
async function loadRepeatChart() {
  const text = await fetchText("./outputs/repeat_windows.csv");
  const rows = parseCSV(text);

  if (!rows.length) throw new Error("repeat_windows.csv parsed 0 rows");

  const x = rows.map(r => r.window_days);
  const y = rows.map(r => Number(r.repeat_rate) * 100);

  Plotly.newPlot("repeatChart", [{
    type: "bar",
    x, y,
    marker: { color: "#7c5cff" },
    hovertemplate: "<b>%{x}</b><br>Repeat: %{y:.1f}%<extra></extra>"
  }], {
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    font: { color: "#e5e7eb" },
    margin: { l: 55, r: 20, t: 10, b: 45 },
    yaxis: { title: "Repeat rate (%)", gridcolor: "rgba(255,255,255,0.08)" },
    xaxis: { title: "Window", gridcolor: "rgba(255,255,255,0.08)" }
  }, { responsive: true, displaylogo: false });
}

async function loadChurnChart() {
  const text = await fetchText("./outputs/monthly_churn.csv");
  const rows = parseCSV(text);

  if (!rows.length) throw new Error("monthly_churn.csv parsed 0 rows");

  const x = rows.map(r => r.prev_month);
  const y = rows.map(r => Number(r.churn_rate) * 100);

  Plotly.newPlot("churnChart", [{
    type: "scatter",
    mode: "lines+markers",
    x, y,
    line: { color: "#22c55e", width: 3 },
    marker: { size: 7 },
    hovertemplate: "<b>%{x}</b><br>Churn: %{y:.1f}%<extra></extra>"
  }], {
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    font: { color: "#e5e7eb" },
    margin: { l: 55, r: 20, t: 10, b: 45 },
    yaxis: { title: "Churn rate (%)", gridcolor: "rgba(255,255,255,0.08)" },
    xaxis: { title: "Month", gridcolor: "rgba(255,255,255,0.08)" }
  }, { responsive: true, displaylogo: false });
}

// ---------- boot ----------
(async function main() {
  console.log("dashboard.js loaded ✅");
  try { await loadKpiCards(); } catch (e) { console.error(e); }
  try { await loadRepeatChart(); } catch (e) { console.error(e); showError("repeatChart", e.message); }
  try { await loadChurnChart(); } catch (e) { console.error(e); showError("churnChart", e.message); }
})();
