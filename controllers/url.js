const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();

  const createdURL = await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id
  });

  return res.redirect("/");
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory
  });
}

async function redirectUrl(req, res) {
  try {
    const shortId = req.params.shortId;

    const url = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: { timestamp: Date.now() }
        }
      },
      { new: true }
    );

    if (!url) {
      return res.status(404).json({ msg: "Short URL not found" });
    }

    return res.status(300).redirect(url.redirectURL);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

async function deleteUrl(req, res) {
  try {
    const deletedURL = await URL.findByIdAndDelete(req.params.id);

    if (!deletedURL) {
      return res.status(404).json({ msg: "URL not found" });
    }

    return res.redirect("/");
  } catch (error) {
    console.error("Error deleting URL:", error.message);
    return res.status(500).json({ msg: error.message });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  redirectUrl,
  deleteUrl
};
