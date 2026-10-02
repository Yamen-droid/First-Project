const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/hello", (req, res) => {
    res.json({
        message: "Hello from Express!"
    });
});

app.get("/api/users", (req, res) => {
    res.json([
        {
            id: 1,
            name: "Yamen"
        },
        {
            id: 2,
            name: "Ahmad"
        }
    ]);
});

// =========================
// START SERVER
// =========================

app.listen(PORT);

