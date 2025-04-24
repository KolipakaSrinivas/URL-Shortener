const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  redirectUrl,
  deleteUrl
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", redirectUrl);
router.get("/analytics/:shortId", handleGetAnalytics);
router.post("/delete/:id", deleteUrl);

module.exports = router;
