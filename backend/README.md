# Expense Tracker

## Project Description

Expense Tracker is a full-stack web application that allows users to manage and track their daily expenses.

The application provides a frontend interface connected directly to a backend REST API. Users can view, add, edit, and delete expenses.

The project was developed as part of the Full Stack Web Development course.

---

## Technologies Used

### Frontend

* HTML
* CSS
* JavaScript
* Bootstrap
* Fetch API

### Backend

* Node.js
* Express.js
* CORS
* PostgreSQL
* pg
* dotenv

### Database

* PostgreSQL
* pgAdmin

---

## Project Structure

```text
Expense_Tracker/

│
├── backend/
│   └── Local backend files used during development
│
├── backend_submission/
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── schema.sql
│   └── server.js
│
├── frontend/
│   └── Front-end files
│
├── final_screenshots/
│   ├── desktop.png
│   ├── mobile.png
│   └── add-expense.png
│
├── phase1_screenshots/
│   └── Phase 1 testing screenshots
│
├── task2/
│   └── Previous task files
│
└── README.md
```

---

# Requirements

Before running the project, make sure the following are installed:

* Node.js
* PostgreSQL
* pgAdmin
* Visual Studio Code
* A modern web browser

---

# Database Setup

## 1. Create the Database

Open PostgreSQL/pgAdmin and create a database named:

```text
expense_tracker
```

## 2. Run schema.sql

Open:

```text
backend_submission/schema.sql
```

Run the SQL commands in pgAdmin.

This creates the required database table and sample data.

---

# Backend Setup

## 1. Open the Backend Submission Folder

Open a terminal in:

```text
backend_submission
```

Example:

```bash
cd backend_submission
```

## 2. Install Dependencies

Run:

```bash
npm install
```

The required packages include:

* express
* cors
* pg
* dotenv

## 3. Configure Environment Variables

Create a local `.env` file inside the backend folder.

Example:

```text
DB_USER=postgres
DB_HOST=localhost
DB_NAME=expense_tracker
DB_PASSWORD=YOUR_POSTGRES_PASSWORD
DB_PORT=5432
PORT=3000
```

Replace:

```text
YOUR_POSTGRES_PASSWORD
```

with your PostgreSQL password.

**Important:** The `.env` file is used locally and must not be submitted.

The project includes `.env.example` as a safe example configuration.

---

# Run the Backend

From the `backend_submission` folder, run:

```bash
node server.js
```

The backend runs on:

```text
http://localhost:3000
```

The main API endpoint is:

```text
http://localhost:3000/api/expenses
```

---

# API Endpoints

## Get All Expenses

```http
GET /api/expenses
```

Returns all expenses.

---

## Get One Expense

```http
GET /api/expenses/:id
```

Returns a specific expense by ID.

If the ID does not exist, the API returns a `404` response.

---

## Add an Expense

```http
POST /api/expenses
```

Example request:

```json
{
  "description": "Lunch",
  "amount": 5.50,
  "category": "Food",
  "expense_date": "2026-09-25"
}
```

Successful creation returns HTTP `201`.

---

## Update an Expense

```http
PUT /api/expenses/:id
```

Example request:

```json
{
  "description": "Dinner",
  "amount": 12.50,
  "category": "Food",
  "expense_date": "2026-09-25"
}
```

---

## Delete an Expense

```http
DELETE /api/expenses/:id
```

Deletes the selected expense.

---

# Allowed Categories

The application supports the following expense categories:

* Food
* Transport
* Shopping
* Bills
* Other

---

# Frontend

The frontend is located in:

```text
frontend/
```

The frontend communicates with the backend using the JavaScript `fetch()` API.

The application uses the REST API to:

* Display expenses
* Add expenses
* Edit expenses
* Delete expenses
* Calculate summary information
* Filter expenses by category

---

# Running the Frontend

First, make sure the backend server is running.

Then open the frontend HTML file from the:

```text
frontend/
```

folder using a browser or VS Code Live Server.

The frontend communicates with:

```text
http://localhost:3000/api/expenses
```

---

# Responsive Design

The application was tested on both desktop and mobile screen sizes.

The layout uses responsive CSS to adapt the application to smaller screens.

The summary cards use CSS Grid on mobile screens:

```css
.summary-cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
}
```

On smaller screens, the summary cards are displayed in a single column to improve readability and usability.

The expense table supports horizontal scrolling on smaller screens.

The application also adjusts:

* Container spacing
* Heading sizes
* Form controls
* Category filter width
* Buttons
* Navigation bar
* Summary cards

---

# Screenshots

## Desktop View

![Expense Tracker Desktop](final_screenshots/desktop.png)

## Mobile View

![Expense Tracker Mobile](final_screenshots/mobile.png)

## Add Expense

![Add Expense](final_screenshots/add-expense.png)

---

# Phase 1 Screenshots

The project also includes screenshots documenting the Phase 1 backend/API testing.

They are stored in:

```text
phase1_screenshots/
```

These screenshots include testing of the required API endpoints and error responses.

---

# Database and API Security

The backend uses parameterized SQL queries.

This helps prevent SQL injection.

Query parameters such as:

```text
$1
```

are used instead of directly inserting user input into SQL statements.

The database generates the expense ID automatically.

---

# Error Handling

The backend handles common API errors, including:

* Invalid expense data
* Missing expense IDs
* Non-existing expenses
* Database errors
* Invalid categories

HTTP status codes are used according to the API requirements, including:

```text
200 OK
201 Created
400 Bad Request
404 Not Found
500 Internal Server Error
```

---

# Clean Code

The project was reviewed to remove unnecessary debugging `console.log` statements.

The code uses clear names for:

* Variables
* Functions
* Routes
* Database operations

Comments are included where they help explain important sections of the code.

---

# Hardest Problem and Solution

One of the main challenges was connecting the frontend to the backend API and making sure the frontend could correctly retrieve and modify data stored in PostgreSQL.

Another challenge was handling date and numeric values returned by PostgreSQL.

The solution was to use the Fetch API on the frontend and REST API endpoints on the backend, while formatting database values correctly before returning them to the frontend.

Testing was performed using the browser and API testing tools to verify that the endpoints worked correctly.

---

# Testing

The application was tested for:

* Getting all expenses
* Getting one expense
* Adding an expense
* Updating an expense
* Deleting an expense
* Invalid requests
* Missing expense IDs
* Database connectivity
* Frontend API communication
* Category filtering
* Desktop layout
* Mobile layout
* Responsive summary cards

---

# Submission Notes

The `backend_submission` folder contains the backend files prepared for submission:

```text
backend_submission/

├── .env.example
├── package.json
├── package-lock.json
├── README.md
├── schema.sql
└── server.js
```

The following files should **not** be submitted:

```text
node_modules/
.env
```

`node_modules` can be recreated by running:

```bash
npm install
```

The `.env` file contains local database credentials and should remain private.

The `.env.example` file is included as a safe example configuration.

---

# How to Run the Project From Scratch

Follow these steps:

### Step 1 — Create the Database

Create:

```text
expense_tracker
```

in PostgreSQL/pgAdmin.

### Step 2 — Run the Database Script

Run:

```text
backend_submission/schema.sql
```

in pgAdmin.

### Step 3 — Configure Environment Variables

Create a local:

```text
.env
```

file with the PostgreSQL connection information.

### Step 4 — Install Backend Packages

Open the terminal inside:

```text
backend_submission
```

and run:

```bash
npm install
```

### Step 5 — Start the Backend

Run:

```bash
node server.js
```

The backend should run on:

```text
http://localhost:3000
```

### Step 6 — Open the Frontend

Open the frontend from:

```text
frontend/
```

using a browser or Live Server.

### Step 7 — Use the Application

The frontend communicates with:

```text
http://localhost:3000/api/expenses
```

The application can then be used to manage expenses.

---

# Project Checklist

* [x] PostgreSQL database created
* [x] Database schema implemented
* [x] Backend REST API implemented
* [x] GET all expenses
* [x] GET expense by ID
* [x] POST expense
* [x] PUT expense
* [x] DELETE expense
* [x] Frontend connected to API
* [x] Responsive design
* [x] CSS Grid used for summary cards
* [x] Category filtering
* [x] Error handling implemented
* [x] SQL parameterization used
* [x] Screenshots included
* [x] README included
* [x] `.env` excluded from submission
* [x] `node_modules` excluded from submission
* [x] Unnecessary debugging `console.log` statements removed

---

# Final Summary

Expense Tracker is a full-stack expense management application built using HTML, CSS, JavaScript, Node.js, Express.js, and PostgreSQL.

The project demonstrates:

* Frontend development
* REST API development
* Database integration
* CRUD operations
* API communication using Fetch
* Responsive web design
* CSS Grid
* Category filtering
* Error handling
* Secure parameterized SQL queries
* Full-stack application structure
