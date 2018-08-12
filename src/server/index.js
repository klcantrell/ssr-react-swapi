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

app.use(express.static("public"));

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
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <title>SSR with React and SWAPI</title>
              <script src="${__STATIC_URL__}bundle.js" defer></script>
              <script>window.__INITIAL_DATA__ = ${serialize(initialData)}</script>
              <style>${styles.toString()}</style>
            </head>

            <body>
              <div id="app" class="column-layout">${markup}</div>
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

app.listen(3000, () => {
  console.log('App server started');
});

module.exports.handler = serverless(app);