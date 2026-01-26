async function loadKpis() {
  const res = await fetch("./outputs/kpi_cards.csv");
  const text = await res.text();

  const rows = text.trim().split("\n").slice(1).map(r => {
    const [kpi, value, format] = r.split(",");
    return { kpi, value: Number(value), format };
  });

  const grid = document.getElementById("kpiGrid");

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

function formatValue(v, format) {
  if (format === "percent") {
    return (v * 100).toFixed(1) + "%";
  }
  if (format === "currency") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(v);
  }
  return v;
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

loadKpis().catch(err => {
  console.error(err);
});

function parseCSV(text) {
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",");
  return lines.slice(1).map(line => {
    const cols = line.split(",");
    const row = {};
    headers.forEach((h, i) => row[h] = cols[i]);
    return row;
  });
}

async function loadRepeatChart() {
  const res = await fetch("./outputs/repeat_windows.csv");
  const text = await res.text();
  const rows = parseCSV(text);

  const x = rows.map(r => r.window_days);
  const y = rows.map(r => Number(r.repeat_rate) * 100);

  Plotly.newPlot("repeatChart", [{
    type: "bar",
    x, y,
    marker: { color: "#7c5cff" },
    hovertemplate: "<b>%{x} days</b><br>Repeat: %{y:.1f}%<extra></extra>"
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
  const res = await fetch("./outputs/monthly_churn.csv");
  const text = await res.text();
  const rows = parseCSV(text);

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

// Call these after KPI cards load
loadRepeatChart().catch(console.error);
loadChurnChart().catch(console.error);
