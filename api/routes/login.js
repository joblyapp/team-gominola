const express = require("express");
const { passportRegister, passportLogin } = require("../auth/passport");
const { protectRoute } = require("../auth/protect");
const { dashboardView } = require("../controllers/dashboardController");
const {
  registerView,
  loginView,
  registerUser,
  loginUser,
} = require("../controllers/loginController");
const router = express.Router();

router.get("/", (req, res) => res.redirect("/login"));
router.get("/register", registerView);
router.get("/login", loginView);
router.get("/dashboard", protectRoute, dashboardView);

router.post("/register", passportRegister, registerUser);
router.post("/login", passportLogin, loginUser);

module.exports = router;
