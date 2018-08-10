const authController = require('./controllers/authentication');

module.exports = app => {
  app.post('/signup', authController.signup);
};