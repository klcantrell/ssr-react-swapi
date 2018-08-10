const jwt = require('jwt-simple');
const db = require('../db/models');

const { User } = db;

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET);
}

const signup = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({error: 'You must provide an email and password'});
  }
  User.findOne({
    where: {
      email,
    },
  }).then(user => {
    if (user) {
      return res.status(422).send({error: 'Email is in use'});
    }
    User.create({
      email,
      password
    }).then(user => {
      res.send({token: tokenForUser(user)});
    })
  }).catch(err => {
    return next(err);
  })
};

const signin = (req, res, next) => {
  res.send({token: tokenForUser(req.user)});
}

module.exports = {
  signup,
  signin,
};