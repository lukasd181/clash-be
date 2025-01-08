const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
