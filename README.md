# Customer Behaviour & Retention Analysis (SQL → Interactive Dashboard)
A SQL-first customer retention analysis built on e-commerce data, with KPIs and cohorts computed in SQLite and visualised through an interactive GitHub Pages dashboard.

## Project Overview
This project analyses customer retention and repeat purchasing behaviour using SQL, based on a real-world e-commerce dataset. The objective is to understand how customers behave over time, identify drop-off points in the customer lifecycle, and highlight opportunities to improve long-term customer value.

All analysis is performed using SQL only, reflecting common workflows in Customer Insights, CRM, and Marketing Analytics roles.

## Business Problem
Customer retention is a key driver of long-term revenue in e-commerce.  
This project investigates **how often customers return, how long it takes them to repeat a purchase, and how retention impacts customer lifetime value**.

The goal was to answer:
- How many customers return after their first purchase?
- How long does it typically take for a customer to purchase again?
- How does short-term retention differ from long-term retention?
- What is the historical revenue contribution per customer?

## Dataset
The analysis uses an e-commerce dataset from Kaggle containing:
- Orders and purchase timestamps
- Customer identifiers
- Payment values per order

### Important Modeling Choice
Customer behaviour was analysed using `customer_unique_id` rather than `customer_id`.

In this dataset, a single customer can appear under multiple `customer_id` values.  
Using `customer_unique_id` was necessary to avoid **artificially low retention rates** and correctly measure repeat behaviour.

## Methodology
1️⃣ All metrics were computed entirely in **SQLite**, with no Python or backend processing.

Key steps:
1. Cleaned and standardised order data into a reusable base view
2. Joined payment data to calculate revenue per order
3. Derived retention, churn, and repeat-purchase metrics using date arithmetic
4. Materialised KPI logic as database views
5. Exported SQL outputs as CSV files for dashboard consumption

## Key Metrics

- **30-Day Retention Rate**  
  Percentage of customers who return at least 30 days after their first purchase

- **Repeat Purchase Rate**  
  Percentage of customers with more than one order

- **Average Time to Second Purchase**  
  Mean number of days between first and second order (repeat customers only)

- **Customer Lifetime Value (Proxy)**  
  Historical revenue per customer, calculated as total payment value aggregated per customer

## Key Insights
- Short-term retention (30 days) is low (~1–2%), indicating that most customers do not return quickly
- Longer-term repeat behaviour increases significantly after 60–120 days
- Customers who do return tend to generate meaningful revenue
- A small repeat-customer segment contributes disproportionately to total revenue

This suggests that **retention initiatives focused on the first 60–90 days could have an outsized impact on revenue**.

## Interactive Dashboard
👉 View the live dashboard here:  
https://<veronjp>.github.io/<customer-retention-sql->/dashboard.html

The dashboard is fully client-side and dynamically loads SQL-derived datasets.

## Tech Stack

- SQL (SQLite)
- DB Browser for SQLite
- Git & GitHub
- GitHub Pages
- JavaScript (Plotly.js)
- HTML / CSS

👤 About

This project was completed as part of a growing analytics portfolio focused on Customer Insights, retention analysis, and data-driven decision making, using SQL to replicate real-world analytical workflows.
