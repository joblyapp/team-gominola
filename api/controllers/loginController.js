const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Register Page
const registerView = (req, res) => {
  res.render("register", {});
};

// View
const loginView = (req, res) => {
  res.render("login", {});
};

// POST Request that handles Register
const registerUser = async (req, res) => {
  const { name, email, location, password, confirm } = req.body;
  if (!name || !email || !password || !confirm) {
    console.log("Fill empty fields");
  } else if (password !== confirm) {
    console.log("Passwords must match");
  } else {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      console.log("There's already a user for this email");
      res.render("register", {
        name,
        email,
        password,
        confirm,
      });
    } else {
      const newUser = new User({
        name,
        email,
        location,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newUser.password, salt);
      newUser.password = hash;
      console.log(newUser);
      return newUser
        .save()
        .then(res.redirect("/login"))
        .catch((error) => console.error(error));
    }
  }
};

// POST Request that handles Login
const passport = require("passport");

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log("Please fill in all the fields");
    res.render("login", {
      email,
      password,
    });
  } else {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res, next);
  }
};

module.exports = {
  registerView,
  loginView,
  registerUser,
  loginUser,
};
