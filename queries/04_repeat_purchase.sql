WITH base AS (
  SELECT
    c.customer_unique_id,
    o.order_id,
    DATE(o.order_purchase_timestamp) AS order_date
  FROM orders o
  JOIN customers c
    ON o.customer_id = c.customer_id
),
ranked AS (
  SELECT
    customer_unique_id,
    order_id,
    order_date,
    ROW_NUMBER() OVER (
      PARTITION BY customer_unique_id
      ORDER BY order_date
    ) AS order_number,
    LAG(order_date) OVER (
      PARTITION BY customer_unique_id
      ORDER BY order_date
    ) AS previous_order_date
  FROM base
)
SELECT
  order_number,
  COUNT(*) AS orders,
  ROUND(
    AVG(julianday(order_date) - julianday(previous_order_date)),
    1
  ) AS avg_days_since_previous_order
FROM ranked
WHERE previous_order_date IS NOT NULL
GROUP BY order_number
ORDER BY order_number;

