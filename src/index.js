const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const { expressErrorHandler, NotFound } = require("./routes/error");
const port = process.env.PORT || 5000;

dotenv.config();
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(
  express.static(path.join(path.resolve(__dirname), "public", "uploads"))
);
mongoose

  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err.message));
app.use("/backend/auth", authRoute);
app.use("/backend/users", userRoute);
app.use("/backend/posts", postRoute);
app.use("/backend/categories", categoryRoute);

app.use(NotFound());
app.use(expressErrorHandler);

app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});

//login
