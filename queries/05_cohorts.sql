WITH base AS (
  SELECT
    c.customer_unique_id,
    strftime('%Y-%m-01', o.order_purchase_timestamp) AS order_month
  FROM orders o
  JOIN customers c
    ON o.customer_id = c.customer_id
),
first_purchase AS (
  SELECT
    customer_unique_id,
    MIN(order_month) AS cohort_month
  FROM base
  GROUP BY customer_unique_id
),
cohort_activity AS (
  SELECT
    fp.cohort_month,
    b.customer_unique_id,
    b.order_month,
    (CAST(strftime('%Y', b.order_month) AS INTEGER) -
     CAST(strftime('%Y', fp.cohort_month) AS INTEGER)) * 12
     +
    (CAST(strftime('%m', b.order_month) AS INTEGER) -
     CAST(strftime('%m', fp.cohort_month) AS INTEGER)) AS month_number
  FROM base b
  JOIN first_purchase fp
    ON b.customer_unique_id = fp.customer_unique_id
)
SELECT
  cohort_month,
  month_number,
  COUNT(DISTINCT customer_unique_id) AS active_customers
FROM cohort_activity
GROUP BY cohort_month, month_number
ORDER BY cohort_month, month_number;

