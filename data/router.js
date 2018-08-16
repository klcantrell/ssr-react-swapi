const express = require('express');
const authController = require('./controllers/authentication');
const authMiddlewares = require('./middlewares/authentication');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authMiddlewares.requireSignin, authController.signin);
router.put('/score', authMiddlewares.requireAuthHeader, authMiddlewares.requireAuth, authController.updateScore);
router.get('/score', authMiddlewares.requireAuthHeader, authMiddlewares.requireAuth, authController.getScore);

module.exports = router;