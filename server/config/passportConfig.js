const { UserModel } = require('../models');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      UserModel.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, {
              id: user.id,
              username: user.username,
              email: user.email
            });
          } else {
            return done(null, false, {
              message: 'invalid credentials'
            });
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    UserModel.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        id: user._id,
        username: user.username,
        email: user.email
      };
      cb(err, userInformation);
    });
  });
};
