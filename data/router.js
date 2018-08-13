const authController = require('./controllers/authentication');
const authMiddlewares = require('./middlewares/authentication');

module.exports = app => {
  app.post('/signup', authController.signup);
  app.post('/signin', authMiddlewares.requireSignin, authController.signin);
  app.put('/score', authMiddlewares.requireAuthHeader, authMiddlewares.requireAuth, authController.updateScore)
  app.get('/score', authMiddlewares.requireAuthHeader, authMiddlewares.requireAuth, authController.getScore)
};