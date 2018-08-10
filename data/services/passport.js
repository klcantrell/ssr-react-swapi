const PassportJwt = require('passport-jwt');
const LocalStrategy = require('passport-local');
const db = require('../db/models');

const { User } = db;

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({
    where: {
      email,
    }
  }).then(user => {
    if (!user) {
      return done(null, false, { message: 'Invalid credentials' });
    }
    user.validPassword(password)
      .then(isMatch => {
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
      })
  }).catch(err => {
    return done(err);
  });
});

const JwtStrategy = PassportJwt.Strategy;
const ExtractJwt = PassportJwt.ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub)
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false, { message: 'Unrecognized token' });
      }
    }).catch(err => {
      done(err, false);
    })
});

module.exports = passport => {
  passport.use('local-login', localLogin);
  passport.use('jwt-login', jwtLogin);
}
