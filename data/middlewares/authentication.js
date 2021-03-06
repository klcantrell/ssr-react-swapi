const passport = require('passport');
const passportService = require('../services/passport');
const jwt = require('jwt-simple');

passportService(passport);

const requireAuth = (req, res, next) => {
  passport.authenticate('jwt-login', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(422).send({error: info.message});
    }
    req.login(user, { session: false }, err => {
      if (err) {
        return next(err);
      }
      next();
    });
  })(req, res, next);
};

const requireSignin = (req, res, next) => {
  passport.authenticate('local-login', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(422).send({error: info.message});
    }
    req.login(user, { session: false }, err => {
      if (err) {
        return next(err);
      }
      next();
    })
  })(req, res, next);
};

const requireAuthHeader = (req, res, next) => {
  try {
    jwt.decode(req.headers.authorization, process.env.JWT_SECRET);
  } catch(e) {
    return res.status(422).send({error: 'You need to be logged in for that'});
  }
  if (req && req.headers.authorization && req.headers.authorization !== 'null') {
    return next();
  }
  return res.status(422).send({error: 'You need to be logged in for that'});
};

module.exports = {
  requireAuth,
  requireSignin,
  requireAuthHeader,
};