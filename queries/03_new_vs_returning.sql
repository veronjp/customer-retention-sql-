WITH payments AS (
  SELECT
    order_id,
    SUM(payment_value) AS order_revenue
  FROM order_payments
  GROUP BY order_id
),
base AS (
  SELECT
    c.customer_unique_id,
    o.order_id,
    DATE(o.order_purchase_timestamp) AS order_date,
    strftime('%Y-%m-01', o.order_purchase_timestamp) AS order_month,
    COALESCE(p.order_revenue, 0) AS order_revenue
  FROM orders o
  JOIN customers c
    ON o.customer_id = c.customer_id
  LEFT JOIN payments p
    ON o.order_id = p.order_id
),
first_purchase AS (
  SELECT
    customer_unique_id,
    MIN(order_date) AS first_order_date,
    strftime('%Y-%m-01', MIN(order_date)) AS first_order_month
  FROM base
  GROUP BY customer_unique_id
),
tagged AS (
  SELECT
    b.order_month,
    b.customer_unique_id,
    CASE
      WHEN fp.first_order_month = b.order_month THEN 'New'
      ELSE 'Returning'
    END AS customer_type
  FROM base b
  JOIN first_purchase fp
    ON b.customer_unique_id = fp.customer_unique_id
)
SELECT
  order_month,
  customer_type,
  COUNT(DISTINCT customer_unique_id) AS customers
FROM tagged
GROUP BY order_month, customer_type
ORDER BY order_month, customer_type;

