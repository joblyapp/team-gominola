const jwt = require("jsonwebtoken");
const passport = require("passport");

// Register Page
const registerView = (req, res) => {
  res.render("register", {});
};

// View
const loginView = (req, res) => {
  res.render("login", {});
};

// POST Request that handles Register
const registerUser = (req, res, next) => {
  console.log(`${req.user.email} user with ${req.user._id} id created.`);
  return res.redirect("/login");
};

// POST Request that handles Login
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


const loginUser = (req, res, next) => {
  passport.use(
    new JWTstrategy(
      {
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
      },
      async (token, done) => {
        try {
          
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
  /*   const { email, password } = req.body;
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
  } */
};

module.exports = {
  registerView,
  loginView,
  registerUser,
  loginUser,
};
