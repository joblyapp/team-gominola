const localStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const passport = require("passport");
const jwt = require("jsonwebtoken");

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.create({ email, password });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

const passportRegister = passport.authenticate("signup", { session: false });

const passportLogin = async (req, res, next) => {
  passport.authenticate("login", async (error, user, info) => {
    try {
      if (error || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET");

        const email = body.email;

        console.log(`${email} connected with token ${token}`);
        return res.json({ email, token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

module.exports = {
  passportRegister,
  passportLogin,
};
