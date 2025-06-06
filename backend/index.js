require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Skai Lama" });
});

connectDB();
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
