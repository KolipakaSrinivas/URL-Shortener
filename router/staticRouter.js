const express = require("express");
const router = express.Router();
const URL = require("../model/url");
const { toLoginUser } = require("../middleware/auth");

router.get("/", toLoginUser, async (req, res) => {
  const user = req.user;
  const urls = await URL.find({ createdBy: user._id });
  return res.render("home", {
    urls: urls
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("uid");
  res.redirect("/login");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});
module.exports = router;
