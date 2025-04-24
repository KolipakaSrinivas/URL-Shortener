const express = require("express");
const URL = require("../models/url");
const { restrictToLoggedinUserOnly } = require("../middlewares/auth");

const router = express.Router();

router.get("/", restrictToLoggedinUserOnly, async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const allurls = await URL.find({ createdBy: req.user._id }).sort({ date: -1 });
  return res.render("home", {
    urls: allurls
  });
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});


router.get("/logout", (req, res) => {
  res.clearCookie("uid");
  res.redirect("/login");
});


module.exports = router;
