import serverless from 'serverless-http';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import { minify } from 'html-minifier';
import App from '../shared/App';
import resetGame from './resetGame';
import { fetchCharacterInfo } from './api';
import { randomInt, html } from '../shared/utils';
import { CHARACTER_INDICES } from '../shared/characterIndices';
import styles from '../shared/App.css';
import lukeImg from '../images/luke.jpg';
import leiaImg from '../images/leia.jpg';
import obiwanImg from '../images/obi-wan.jpg';
import anakinImg from '../images/anakin.jpg';
import hansoloImg from '../images/han-solo.jpg';
import yodaImg from '../images/yoda.jpg';
import bobafettImg from '../images/boba-fett.jpg';
import quigonImg from '../images/qui-gon.jpg';
import padmeImg from '../images/padme.jpg';
import darthmaulImg from '../images/darth-maul.jpg';
import finnImg from '../images/finn.jpg';
import reyImg from '../images/rey.jpg';
import poeImg from '../images/poe.jpg';
import bb8Img from '../images/bb8.jpg';
import phasmaImg from '../images/captain-phasma.jpg';

const INDEX_TO_IMGDATA_MAP = {
  '1': lukeImg,
  '5': leiaImg,
  '10': obiwanImg,
  '11': anakinImg,
  '14': hansoloImg,
  '20': yodaImg,
  '22': bobafettImg,
  '32': quigonImg,
  '35': padmeImg,
  '44': darthmaulImg,
  '84': finnImg,
  '85': reyImg,
  '86': poeImg,
  '87': bb8Img,
  '88': phasmaImg,
};

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(express.static("public"));
}

app.get("/", (req, res, next) => {
  const correctCharacter = CHARACTER_INDICES[randomInt(CHARACTER_INDICES.length - 1)];
  resetGame(correctCharacter, fetchCharacterInfo)
    .then(optionsData => {
      const initialData = { correctCharacter, optionsData, questionImg: INDEX_TO_IMGDATA_MAP[correctCharacter] };
      const markup = renderToString(
        <App data={initialData} />
      );
      const minifiedHtml = minify(
        html`
          <!DOCTYPE html>
          <html>
            <head>
              <title>SSR with React and SWAPI</title>
              <style>${styles.toString()}</style>
              <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
              <link rel="apple-touch-icon-precomposed" sizes="180x180" href="${__STATIC_URL__}apple-touch-icon.png">
              <link rel="icon" type="image/png" sizes="32x32" href="${__STATIC_URL__}favicon-32x32.png">
              <link rel="icon" type="image/png" sizes="16x16" href="${__STATIC_URL__}favicon-16x16.png">
              <link rel="manifest" href="${__STATIC_URL__}site.webmanifest">
              <link rel="mask-icon" href="${__STATIC_URL__}safari-pinned-tab.svg" color="#5bbad5">
              <link rel="shortcut icon" href="${__STATIC_URL__}favicon.ico" type="image/ico">
              <meta name="msapplication-TileColor" content="#2d89ef">
              <meta name="theme-color" content="#1800e3">
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <script src="${__STATIC_URL__}bundle.js" defer></script>
              <script>window.__INITIAL_DATA__ = ${serialize(initialData)}</script>
            </head>

            <body>
              <div id="app" class="column-layout">${markup}</div>
              <div class="k-tag">
                <svg width="50" height="50" viewBox="0 0 300 500">
                  <path
                    fill="rgb(255, 156, 0)" stroke="black" stroke-width="10"
                    d="M 152.77,315.36 C 229.84,278.14 252.00,249.33 252.00,229.39 252.00,216.53 243.14,209.00 228.97,209.00 205.48,209.00 171.38,227.17 134.61,264.39 134.61,264.39 107.58,404.00 107.58,404.00 107.58,404.00 81.89,404.00 81.89,404.00 81.89,404.00 141.69,95.22 141.69,95.22 141.69,95.22 168.27,93.00 168.27,93.00 168.27,93.00 139.48,240.02 139.48,240.02 175.36,203.48 212.58,185.00 240.92,185.00 265.95,185.00 280.00,199.03 280.00,219.64 280.00,248.44 253.08,281.69 185.11,315.36 185.11,315.36 269.50,401.78 269.50,401.78 269.50,401.78 239.44,406.00 239.44,406.00 239.44,406.00 152.77,315.36 152.77,315.36 Z"
                  >
                </svg>
                <h5>Star Wars Guess Who</h5>
              </div>
            </body>
          </html>
        `,
        {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          html5: true,
          minifyCSS: true,
          removeComments: true,
          removeEmptyAttributes: true,
        }
      );

      res.send(minifiedHtml);
    })
    .catch(next);
  });

  app.get('/api/resetGame/:currentCorrectCharacter?', (req, res, next) => {
    let correctCharacter;  
    do {
      correctCharacter = CHARACTER_INDICES[randomInt(CHARACTER_INDICES.length - 1)];
    } while(req.params.currentCorrectCharacter && correctCharacter == req.params.currentCorrectCharacter)
    resetGame(correctCharacter, fetchCharacterInfo)
      .then(optionsData => {
        res
          .set({
            "Access-Control-Allow-Origin" : "*",
          })
          .json({
            correctCharacter, 
            optionsData, 
            questionImg: INDEX_TO_IMGDATA_MAP[correctCharacter],
          });
      })
      .catch(next);
  });

if (process.env.NODE_ENV === 'development') {
  app.listen(3000, () => {
    console.log('App server started');
  });
}

module.exports.handler = serverless(app);