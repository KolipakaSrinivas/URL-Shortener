const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      unique: true,
      require: true
    },
    redirectURL: {
      type: String,
      require: true
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "users"
    },
    vistHistory: [{ timeStamp: { type: String } }]
  },
  { timestamps: true }
);

const URL = mongoose.model("url", UrlSchema);
module.exports = URL;
