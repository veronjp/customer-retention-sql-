# customer-retention-sql-
📊 Customer Retention & Behaviour Analysis (SQL)
📌 Project Overview

This project analyses customer retention and repeat purchasing behaviour using SQL, based on a real-world e-commerce dataset. The objective is to understand how customers behave over time, identify drop-off points in the customer lifecycle, and highlight opportunities to improve long-term customer value.

All analysis is performed using SQL only, reflecting common workflows in Customer Insights, CRM, and Marketing Analytics roles.

🧠 Business Questions

The analysis focuses on four core questions:

How many customers are new vs returning over time?

How frequently do customers repeat purchases, and how does behaviour change after the second order?

How well are customers retained across cohorts after their first purchase?

Which customers are currently at risk of churn?

🗂 Dataset

Public e-commerce dataset (Olist)

Tables used:

customers

orders

order_payments

Analysis is performed locally using SQLite; raw data files are excluded from version control.

🛠 Tools & Skills Demonstrated

SQL (SQLite)

Joins & Common Table Expressions (CTEs)

Window functions (ROW_NUMBER, LAG)

Date handling and time-based analysis

Cohort analysis

Churn definition and lifecycle thinking

Translating data outputs into business insights

🔍 Analysis Structure
1️⃣ Base Customer Orders Table

A reusable, analysis-ready dataset was created by joining customers, orders, and payments into a single view with:

Unique customer identifier

Order dates and order month

Order revenue

📄 Query: queries/02_customer_orders.sql

2️⃣ New vs Returning Customers

Customers were classified based on whether their order occurred in their first purchase month or a subsequent month.

📄 Query: queries/03_new_vs_returning.sql

Key insight:

Growth is driven primarily by new customers, with returning customer volumes increasing more slowly over time.

3️⃣ Repeat Purchase Behaviour

Purchase sequences were analysed to understand:

How many customers place multiple orders

The average time between repeat purchases

📄 Query: queries/04_repeat_purchase.sql

Key insight:

Customer drop-off is highest after the second purchase, but customers who make a third order return more quickly, indicating that driving a successful second purchase is critical for long-term retention.

4️⃣ Cohort Retention Analysis

Customers were grouped into cohorts based on their first purchase month, and retention was tracked over subsequent months.

📄 Query: queries/05_cohorts.sql

Key insight:

Cohort analysis shows strong growth in customer acquisition over time, but consistently low early retention across all cohorts, with most customers churning after their first purchase and a small loyal minority driving long-term repeat behaviour.

5️⃣ Churn Risk Identification

Customers were flagged as at risk of churn if they had not made a purchase in the last 90 days relative to the most recent order date in the dataset.

📄 Query: queries/06_churn_risk.sql

Key insight:

Churn risk is heavily concentrated among one-time buyers, reinforcing the importance of early lifecycle engagement and second-purchase conversion.

📈 Key Takeaways

Customer growth during the period analysed is acquisition-led rather than retention-led

The largest drop-off occurs immediately after the first purchase

Customers who reach a second or third purchase show faster repeat behaviour

A small group of loyal customers drives long-term engagement

Improving early post-purchase engagement represents the largest opportunity to increase customer lifetime value

🚀 Next Steps

If this were a live business environment, next steps would include:

Identifying characteristics of long-term retained customers

Testing second-purchase incentives within the first 30–60 days

Segmenting customers by behaviour or value (e.g. RFM-style analysis)

Connecting outputs to dashboards or CRM tools for activation

👤 About

This project was completed as part of a growing analytics portfolio focused on Customer Insights, retention analysis, and data-driven decision making, using SQL to replicate real-world analytical workflows.
