const URL = require("../model/url");
const { nanoid } = require("nanoid");

async function handleGenerateNewUrl(req, res) {
  try {
    const body = req.body;
    if (!body.url) return res.status(400).json({ msg: "url required" });
    const shortId = nanoid(8);
    const newUrl = await URL.create({
      shortId: shortId,
      redirectURL: body.url,
      vistHistory: [],
      createdBy: req.user._id
    });
    return res.redirect("/");
    // return res.status(201).json({ status: "sucess", newUrl: shortId });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

async function redirectUrl(req, res) {
  try {
    const shortId = req.params.shortId;
    const url = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          vistHistory: { timeStamp: Date.now() }
        }
      }
    );
    return res.status(300).redirect(url.redirectURL);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

async function handleGetAnalytics(req, res) {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });
    return res
      .status(200)
      .json({ totalClicks: entry.vistHistory.length, Analytics: entry });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}
module.exports = { handleGenerateNewUrl, redirectUrl, handleGetAnalytics };
