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
