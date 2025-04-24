const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");
const crypto = require("crypto-js");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const encryptedPassword = crypto.AES
      .encrypt(password, process.env.SECRET_KEY)
      .toString();
    const user = await User.create({
      name,
      email,
      password: encryptedPassword
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
  return res.redirect("/login");
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.render("login", {
        error: "Email Not Found"
      });

    const decryptedPassword = crypto.AES
      .decrypt(user.password, process.env.SECRET_KEY)
      .toString(crypto.enc.Utf8);

    if (password !== decryptedPassword)
      return res.render("login", {
        error: "Invalid Password "
      });

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);

    return res.redirect("/");
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin
};
