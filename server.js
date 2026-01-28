const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Serve images from chocolates/ folder
app.use("/chocolates", express.static(path.join(__dirname, "chocolates")));

// Safe JSON load
let chocolatesData = [];

try {
  const dataPath = path.join(__dirname, "chocolates.json");
  chocolatesData = JSON.parse(fs.readFileSync(dataPath, "utf8"));
} catch (error) {
  console.error("Error loading chocolates.json:", error);
}

// GET all items
app.get("/api/chocolates", (req, res) => {
  res.json(chocolatesData);
});

// GET single item by ID
app.get("/api/chocolates/:id", (req, res) => {
  const item = chocolatesData.find((c) => c.id === parseInt(req.params.id));

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  res.json(item);
});

// 👉 ONLY ADDED THIS PART (nothing else changed)
app.get("/ping", (req, res) => {
  res.send("Server is awake 🚀");
});

// Render requires this:
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✔ Server running on port ${PORT}`);
});

