
CREATE TABLE IF NOT EXISTS expenses (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100),
    expense_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO expenses (description, amount, category, expense_date)
VALUES
('Lunch', 5.50, 'Food', '2026-09-25'),
('Taxi', 3.00, 'Transport', '2026-09-25'),
('Coffee', 2.00, 'Food', '2026-09-24');
