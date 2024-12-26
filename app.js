const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;
const connectionToDB = require("./db");

const staticRouter = require("./router/staticRouter");
const urlRouter = require("./router/url");
const userRouter = require("./router/user");

//auth
const {toLoginUser} = require("./middleware/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Template engines
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/url", (req, res) => {
  res.send("Welcome To the URL Shortener");
});

app.use("/url", toLoginUser, urlRouter);
app.use("/", staticRouter);
app.use("/", userRouter);

connectionToDB(process.env.MONGODB_URL).then(() =>
  console.log("connectd To DB 🏬")
);
app.listen(PORT, () => console.log(`Server 🚀🚀  Port  ${PORT}`));
