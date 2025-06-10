require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db.js");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://skai-lama-assignment-a5pi.vercel.app",
      "https://skai-lama-assignment-xi.vercel.app",
      "https://skai-lama-assignment-aashishkumar321s-projects.vercel.app",
      "https://skai-lama-assignment-six.vercel.app/",
    ],
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Skai Lama" });
});

app.use("/api/user", routes.userRouter);
app.use("/api/project", routes.projectRouter);
app.use("/api/episode", routes.episodeRouter);

connectDB();
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
