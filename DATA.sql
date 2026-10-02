SELECT * FROM expenses;
INSERT INTO expenses (description, amount, category, expense_date)
VALUES
('Lunch', 5.50, 'Food', '2026-09-25'),
('Taxi', 3.00, 'Transport', '2026-09-25'),
('Coffee', 2.00, 'Food', '2026-09-24');
SELECT SUM(amount) AS total_expenses
FROM expenses;


SELECT category, SUM(amount) AS total
FROM expenses
GROUP BY category;


SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'expenses'
ORDER BY ordinal_position;