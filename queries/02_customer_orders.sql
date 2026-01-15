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
    o.order_status,
    COALESCE(p.order_revenue, 0) AS order_revenue
  FROM orders o
  JOIN customers c
    ON o.customer_id = c.customer_id
  LEFT JOIN payments p
    ON o.order_id = p.order_id
)
SELECT *
FROM base
LIMIT 50;

