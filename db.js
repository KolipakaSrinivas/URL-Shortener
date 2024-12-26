const mongoose = require("mongoose");

function connectionToDB(url) {
  try {
    return mongoose.connect(url);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = connectionToDB;