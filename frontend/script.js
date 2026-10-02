const API_URL = "http://localhost:3000/api/expenses";

let allExpenses = [];


// ===============================
// Bootstrap Alert
// ===============================

function showAlert(message, type = "danger") {

    const alertContainer =
        document.getElementById("alertContainer");

    alertContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert">
            </button>
        </div>
    `;
}


// ===============================
// Spinner
// ===============================

function showSpinner() {
    document
        .getElementById("loadingSpinner")
        .style.display = "block";
}

function hideSpinner() {
    document
        .getElementById("loadingSpinner")
        .style.display = "none";
}


// ===============================
// GET - Get all expenses
// ===============================

async function getExpenses() {

    showSpinner();

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Could not load expenses.");
        }

        const expenses = await response.json();

        allExpenses = expenses;

        updateSummary(expenses);

        displayExpenses(expenses);

    } catch (error) {

        console.error(error);

        showAlert(
            "Could not connect to the server. Please make sure the server is running.",
            "danger"
        );

    } finally {

        hideSpinner();
    }
}


// ===============================
// Summary Cards
// ===============================

function updateSummary(expenses) {

    const total = expenses.reduce(
        (sum, expense) =>
            sum + Number(expense.amount),
        0
    );

    const count = expenses.length;

    const highest =
        expenses.length > 0
            ? Math.max(
                ...expenses.map(
                    expense => Number(expense.amount)
                )
            )
            : 0;

    document.getElementById("totalAmount").textContent =
        `$${total.toFixed(2)}`;

    document.getElementById("expenseCount").textContent =
        count;

    document.getElementById("highestExpense").textContent =
        `$${highest.toFixed(2)}`;
}


// ===============================
// Display Expenses
// ===============================

function displayExpenses(expenses) {

    const tableBody =
        document.getElementById("expenseTableBody");

    tableBody.innerHTML = "";

    if (expenses.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">
                    No expenses found.
                </td>
            </tr>
        `;

        return;
    }

    expenses.forEach(expense => {

        const row = document.createElement("tr");

        const badgeClass =
            getBadgeClass(expense.category);

        row.innerHTML = `
            <td>
                ${escapeHtml(expense.description)}
            </td>

            <td>
                $${Number(expense.amount).toFixed(2)}
            </td>

            <td>
                <span class="category-badge ${badgeClass}">
                    ${escapeHtml(expense.category)}
                </span>
            </td>

            <td>
                ${expense.expense_date}
            </td>

            <td>

                <button
                    class="btn btn-sm btn-warning me-1"
                    onclick="openEditModal(${expense.id})">
                    Edit
                </button>

                <button
                    class="btn btn-sm btn-danger"
                    onclick="deleteExpense(${expense.id})">
                    Delete
                </button>

            </td>
        `;

        tableBody.appendChild(row);
    });
}


// ===============================
// Category Badge
// ===============================

function getBadgeClass(category) {

    switch (category) {

        case "Food":
            return "badge-food";

        case "Transport":
            return "badge-transport";

        case "Shopping":
            return "badge-shopping";

        case "Bills":
            return "badge-bills";

        default:
            return "badge-other";
    }
}


// ===============================
// HTML Protection
// ===============================

function escapeHtml(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


// ===============================
// Validation
// ===============================

function validateForm() {

    let valid = true;

    document.getElementById("descriptionError").textContent = "";
    document.getElementById("amountError").textContent = "";
    document.getElementById("categoryError").textContent = "";
    document.getElementById("dateError").textContent = "";

    const description =
        document.getElementById("description").value.trim();

    const amount =
        Number(document.getElementById("amount").value);

    const category =
        document.getElementById("category").value;

    const date =
        document.getElementById("expense_date").value;


    if (!description) {

        document.getElementById("descriptionError")
            .textContent =
            "Title is required.";

        valid = false;
    }


    if (!amount || amount <= 0) {

        document.getElementById("amountError")
            .textContent =
            "Amount must be greater than 0.";

        valid = false;
    }


    if (!category) {

        document.getElementById("categoryError")
            .textContent =
            "Please select a category.";

        valid = false;
    }


    if (!date) {

        document.getElementById("dateError")
            .textContent =
            "Date is required.";

        valid = false;
    }


    return valid;
}


// ===============================
// POST - Add Expense
// ===============================

async function addExpense(event) {

    event.preventDefault();

    if (!validateForm()) {
        return;
    }


    const expenseData = {

        description:
            document.getElementById("description")
                .value.trim(),

        amount:
            Number(
                document.getElementById("amount").value
            ),

        category:
            document.getElementById("category").value,

        expense_date:
            document.getElementById("expense_date").value
    };


    try {

        const response =
            await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(expenseData)
            });


        const result =
            await response.json();


        if (!response.ok) {

            showAlert(
                result.message ||
                "Failed to add expense.",
                "danger"
            );

            return;
        }


        showAlert(
            "Expense added successfully!",
            "success"
        );


        document
            .getElementById("expenseForm")
            .reset();


        await getExpenses();


    } catch (error) {

        console.error(error);

        showAlert(
            "Could not connect to the server. Please make sure the server is running.",
            "danger"
        );
    }
}


// ===============================
// Open Edit Modal
// ===============================

async function openEditModal(id) {

    try {

        const response =
            await fetch(`${API_URL}/${id}`);


        const expense =
            await response.json();


        if (!response.ok) {

            showAlert(
                expense.message ||
                "Failed to load expense.",
                "danger"
            );

            return;
        }


        document.getElementById("editId")
            .value = expense.id;


        document.getElementById("editDescription")
            .value = expense.description;


        document.getElementById("editAmount")
            .value = expense.amount;


        document.getElementById("editCategory")
            .value = expense.category;


        document.getElementById("editDate")
            .value =
            convertDateToISO(
                expense.expense_date
            );


        const modal =
            new bootstrap.Modal(
                document.getElementById("editModal")
            );


        modal.show();


    } catch (error) {

        console.error(error);

        showAlert(
            "Could not connect to the server.",
            "danger"
        );
    }
}


// ===============================
// PUT - Save Edit
// ===============================

async function saveEdit() {

    const id =
        document.getElementById("editId").value;


    const description =
        document.getElementById("editDescription")
            .value.trim();


    const amount =
        Number(
            document.getElementById("editAmount").value
        );


    const category =
        document.getElementById("editCategory").value;


    const expense_date =
        document.getElementById("editDate").value;


    if (!description) {

        showAlert(
            "Title is required.",
            "danger"
        );

        return;
    }


    if (!amount || amount <= 0) {

        showAlert(
            "Amount must be greater than 0.",
            "danger"
        );

        return;
    }


    if (!category) {

        showAlert(
            "Please select a category.",
            "danger"
        );

        return;
    }


    if (!expense_date) {

        showAlert(
            "Date is required.",
            "danger"
        );

        return;
    }


    const updatedExpense = {

        description,
        amount,
        category,
        expense_date
    };


    try {

        const response =
            await fetch(
                `${API_URL}/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(updatedExpense)
                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            showAlert(
                result.message ||
                "Failed to update expense.",
                "danger"
            );

            return;
        }


        const modalElement =
            document.getElementById("editModal");


        const modal =
            bootstrap.Modal.getInstance(
                modalElement
            );


        if (modal) {
            modal.hide();
        }


        showAlert(
            "Expense updated successfully!",
            "success"
        );


        await getExpenses();


    } catch (error) {

        console.error(error);

        showAlert(
            "Could not connect to the server. Please make sure the server is running.",
            "danger"
        );
    }
}


// ===============================
// DELETE
// ===============================

async function deleteExpense(id) {

    if (
        !confirm(
            "Are you sure you want to delete this expense?"
        )
    ) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE"
                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            showAlert(
                result.message ||
                "Failed to delete expense.",
                "danger"
            );

            return;
        }


        showAlert(
            "Expense deleted successfully!",
            "success"
        );


        await getExpenses();


    } catch (error) {

        console.error(error);

        showAlert(
            "Could not connect to the server. Please make sure the server is running.",
            "danger"
        );
    }
}


// ===============================
// Filter
// ===============================

function filterExpenses() {

    const selectedCategory =
        document.getElementById(
            "categoryFilter"
        ).value;


    if (selectedCategory === "All") {

        displayExpenses(allExpenses);

        return;
    }


    const filtered =
        allExpenses.filter(
            expense =>
                expense.category === selectedCategory
        );


    displayExpenses(filtered);
}


// ===============================
// Date Conversion
// ===============================

function convertDateToISO(dateString) {

    if (!dateString) {
        return "";
    }


    const parts =
        dateString.split("-");


    if (parts.length !== 3) {
        return "";
    }


    const day = parts[0];
    const month = parts[1];
    const year = parts[2];


    return `${year}-${month}-${day}`;
}


// ===============================
// Events
// ===============================

document
    .getElementById("expenseForm")
    .addEventListener(
        "submit",
        addExpense
    );


document
    .getElementById("saveEditButton")
    .addEventListener(
        "click",
        saveEdit
    );


document
    .getElementById("categoryFilter")
    .addEventListener(
        "change",
        filterExpenses
    );


// ===============================
// Start
// ===============================

getExpenses();
