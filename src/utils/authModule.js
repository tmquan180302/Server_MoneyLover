require("dotenv").config();
const { SECRECT } = process.env;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../app/models/User");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({
      email: username,
      role: "admin",
    });

    if (!user) return done(null, false, { message: "User not found" });
    const matches = await bcrypt.compare(password, user.passWord);
    if (matches != true) return done(null, false, { message: "Password not correct" });

    done(null, user);
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) throw "User not found";
    done(null, user);
  } catch (error) {
    console.log(error);
    done(null, false, { message: error });
  }
});

module.exports = { passport };
