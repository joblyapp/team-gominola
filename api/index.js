const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();
const { loginCheck } = require("./auth/passport");
loginCheck(passport);

// MongoDb connection
const database = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);
mongoose
  .connect(database, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Mongoose connected"))
  .catch((error) => console.error(error));

// set the view engine to ejs
app.set("view engine", "ejs");

//BodyParsing
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "oneboy",
    saveUninitialized: true,
    resave: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", require("./routes/login"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log(`Server started on http://localhost:${PORT}`));
