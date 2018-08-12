const serverless = require('serverless-http');
const express = require('express');
const router = require('./router');
const cors = require('cors');
const env = require('../env');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({type: '*/*'}));
router(app);

app.listen(PORT, () => {
  console.log('DB server has started');
});

module.exports.handler = serverless(app);