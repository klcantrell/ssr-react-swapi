const jwt = require('jwt-simple');
const db = require('../db/models');

const { User, Score } = db;

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET);
}

const signup = (req, res, next) => {
  const { email, password, score } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide an email and password' });
  }
  User.findOne({
    where: {
      email,
    },
  }).then(user => {
    if (user) {
      return res.status(422).send({ error: 'Email is in use' });
    }
    User.create({
      email,
      password
    }).then(user => {
      Score.create({
        userId: user.id,
        value: score || 0,
      }).then(score => {
        res.send({ token: tokenForUser(user), user:{ email: user.email, score: score.value }});
      })
    })
  }).catch(err => {
    return next(err);
  });
};

const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user), user:{ email: req.user.email, score: req.user.score.value }});
};

const updateScore = (req, res, next) => {
  Score.findById(req.user.score.id)
    .then(score => {
      score.update({
        value: req.body.score,
      }).then(updatedScore => {
        res.send(updatedScore);
      });
    }).catch(err => {
      return next(err);
    })
};

const getScore = (req, res, next) => {
  res.send({ user: { email: req.user.email, score: req.user.score.value } });
}

module.exports = {
  signup,
  signin,
  updateScore,
  getScore,
};