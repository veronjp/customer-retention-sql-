-- list tables (works in many SQLite setups; if not, use your UI table browser)
SELECT name FROM sqlite_master WHERE type='table';

-- preview
SELECT * FROM orders LIMIT 5;
SELECT * FROM customers LIMIT 5;
SELECT * FROM order_payments LIMIT 5;
