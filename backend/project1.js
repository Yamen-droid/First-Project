const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = 3000;

const ALLOWED_CATEGORIES = [
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Other"
];

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Test database connection
// Test database connection
pool.query("SELECT NOW()", (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    }
});

// =========================
// HELLO
// =========================

app.get("/api/hello", (req, res) => {
    res.json({
        message: "Expense Tracker Backend is running!"
    });
});

// =========================
// GET ALL EXPENSES
// =========================

app.get("/api/expenses", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                id,
                description,
                amount,
                category,
                TO_CHAR(expense_date, 'DD-MM-YYYY') AS expense_date,
                TO_CHAR(created_at, 'DD-MM-YYYY') AS created_at
            FROM expenses
            ORDER BY expense_date DESC, id DESC
        `);

        res.json(
            result.rows.map(expense => ({
                ...expense,
                amount: Number(expense.amount)
            }))
        );

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch expenses"
        });
    }
});

// =========================
// GET ONE EXPENSE
// =========================

app.get("/api/expenses/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!/^\d+$/.test(id)) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        const result = await pool.query(
            `
            SELECT
                id,
                description,
                amount,
                category,
                TO_CHAR(expense_date, 'DD-MM-YYYY') AS expense_date,
                TO_CHAR(created_at, 'DD-MM-YYYY') AS created_at
            FROM expenses
            WHERE id = $1
            `,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        const expense = result.rows[0];

        res.json({
            ...expense,
            amount: Number(expense.amount)
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch expense"
        });
    }
});

// =========================
// CREATE EXPENSE
// =========================

app.post("/api/expenses", async (req, res) => {
    try {
        const {
            description,
            amount,
            category,
            expense_date
        } = req.body;

        // Required fields
        if (!description || amount === undefined || !expense_date) {
            return res.status(400).json({
                message: "description, amount, and expense_date are required"
            });
        }

        // Amount validation
        if (isNaN(amount) || Number(amount) <= 0) {
            return res.status(400).json({
                message: "amount must be a number greater than 0"
            });
        }

        // Category validation
        if (category && !ALLOWED_CATEGORIES.includes(category)) {
            return res.status(400).json({
                message: "Invalid category"
            });
        }

        const result = await pool.query(
            `
            INSERT INTO expenses
                (description, amount, category, expense_date)
            VALUES
                ($1, $2, $3, $4)
            RETURNING
                id,
                description,
                amount,
                category,
                TO_CHAR(expense_date, 'DD-MM-YYYY') AS expense_date,
                TO_CHAR(created_at, 'DD-MM-YYYY') AS created_at
            `,
            [
                description,
                amount,
                category,
                expense_date
            ]
        );

        const expense = result.rows[0];

        res.status(201).json({
            ...expense,
            amount: Number(expense.amount)
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create expense"
        });
    }
});

// =========================
// UPDATE EXPENSE
// =========================

app.put("/api/expenses/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const {
            description,
            amount,
            category,
            expense_date
        } = req.body;

        // ID validation
        if (!/^\d+$/.test(id)) {
            return res.status(400).json({
                message: "Invalid expense ID"
            });
        }

        // Required fields
        if (!description || amount === undefined || !expense_date) {
            return res.status(400).json({
                message: "description, amount, and expense_date are required"
            });
        }

        // Amount validation
        if (isNaN(amount) || Number(amount) <= 0) {
            return res.status(400).json({
                message: "amount must be a number greater than 0"
            });
        }

        // Category validation
        if (category && !ALLOWED_CATEGORIES.includes(category)) {
            return res.status(400).json({
                message: "Invalid category"
            });
        }

        const result = await pool.query(
            `
            UPDATE expenses
            SET
                description = $1,
                amount = $2,
                category = $3,
                expense_date = $4
            WHERE id = $5
            RETURNING
                id,
                description,
                amount,
                category,
                TO_CHAR(expense_date, 'DD-MM-YYYY') AS expense_date,
                TO_CHAR(created_at, 'DD-MM-YYYY') AS created_at
            `,
            [
                description,
                amount,
                category,
                expense_date,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        const expense = result.rows[0];

        res.json({
            ...expense,
            amount: Number(expense.amount)
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update expense"
        });
    }
});

// =========================
// DELETE EXPENSE
// =========================

app.delete("/api/expenses/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // ID validation
        if (!/^\d+$/.test(id)) {
            return res.status(400).json({
                message: "Invalid expense ID"
            });
        }

        const result = await pool.query(
            `
            DELETE FROM expenses
            WHERE id = $1
            RETURNING
                id,
                description,
                amount,
                category,
                TO_CHAR(expense_date, 'DD-MM-YYYY') AS expense_date,
                TO_CHAR(created_at, 'DD-MM-YYYY') AS created_at
            `,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        const expense = result.rows[0];

        res.json({
            message: "Expense deleted successfully",
            expense: {
                ...expense,
                amount: Number(expense.amount)
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete expense"
        });
    }
});

// =========================
// START SERVER
// =========================

app.listen(PORT);
