const User = require("../model/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    if ((!name && !email, !password))
      return res.status(400).json({ msg: "required all fealds" });
    const user = await User.create({
      name,
      email,
      password
    });
    return res.render("login");
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user)
      return res.render("login", {
        error: "Invalid Email or Password "
      });

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);

    return res.redirect("/");
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

module.exports = { handleUserSignup, handleUserLogin };
