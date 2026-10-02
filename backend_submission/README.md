# Expense Tracker Backend

## Description

Backend API for the Expense Tracker application using Node.js, Express, and PostgreSQL.

## Requirements

- Node.js
- PostgreSQL

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file based on `.env.example`.

3. Add your PostgreSQL database information to `.env`.

4. Make sure the database `expense_tracker` exists.

5. Run the server:

```bash
node server.js
```

The server runs on:

http://localhost:3000

## API Endpoints

- GET `/api/expenses`
- GET `/api/expenses/:id`
- POST `/api/expenses`
- PUT `/api/expenses/:id`
- DELETE `/api/expenses/:id`

## Database

The database uses PostgreSQL and contains an `expenses` table.

The `schema.sql` file contains the table structure and initial test data.

## Validation

The backend validates required fields, amount, category, and expense ID.

All database queries use parameterized queries.

## Project Demo Video

[Watch the Expense Tracker Demo](https://drive.google.com/file/d/1unuSjv2xK4W1kd85cEAmptqMpjpB5CK0/view?usp=sharing)

## GitHub Repository

[View Expense Tracker on GitHub](https://github.com/Yamen-droid/First-Project)
