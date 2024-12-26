const express = require("express");
const router = express.Router();
const { handleGenerateNewUrl,redirectUrl,handleGetAnalytics } = require("../controller/url");

router.post("/", handleGenerateNewUrl);
router.get("/:shortId", redirectUrl);
router.get('/analytics/:shortId',handleGetAnalytics)
module.exports = router;
