import serverless from 'serverless-http';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import App from '../shared/App';
import resetGame from './resetGame';
import { fetchCharacterInfo } from './api';
import { randomInt, html } from '../shared/utils';
import { CHARACTER_INDICES } from '../shared/characterIndices';
import lukeImg from '../images/luke.jpg';
import leiaImg from '../images/leia.jpg';
import obiwanImg from '../images/obi-wan.jpg';
import anakinImg from '../images/anakin.jpg';
import hansoloImg from '../images/han-solo.jpg';
import starWarsFont from '../fonts/Starjedi.ttf';

const INDEX_TO_IMGDATA_MAP = {
  '1': lukeImg,
  '5': leiaImg,
  '10': obiwanImg,
  '11': anakinImg,
  '14': hansoloImg,
};

const app = express();

// app.use(express.static("public"));

app.get("/", (req, res, next) => {
  const correctCharacter = CHARACTER_INDICES[randomInt(CHARACTER_INDICES.length - 1)];
  resetGame(correctCharacter, fetchCharacterInfo)
    .then(optionsData => {
      const initialData = { correctCharacter, optionsData, questionImg: INDEX_TO_IMGDATA_MAP[correctCharacter] };
      const markup = renderToString(
        <App data={initialData} />
      );

      res.send(
        html`
          <!DOCTYPE html>
          <html>
            <head>
              <title>SSR with React and SWAPI</title>
              <script src="${__STATIC_URL__}bundle.js" defer></script>
              <script>window.__INITIAL_DATA__ = ${serialize(initialData)}</script>
              <style>
                @font-face {
                  font-family: 'Star Wars';
                  src: url(${starWarsFont}) format('truetype');
                }
                :root {
                  font-family: 'Star Wars', fantasy;
                  height: 100%;
                }
                #app {
                  height: 100%;
                  display: flex;
                  flex-flow: column;
                  align-items: center;
                  justify-content: flex-start;
                  text-align: center;
                }
                body {
                  height: 100%;
                  background: #0d5aa0;
                  color: #fbfffe;
                  margin: 0;
                }
                .game-message {
                  color: #9e5960;
                  text-shadow: 1px 1px black;
                }
                .hero-img {
                  display: grid;
                  width: 300px;
                  margin-bottom: 20px;
                  z-index: 1;
                  border-radius: 5px;
                  box-shadow: -1px 1px 5px black;
                  overflow: hidden;
                }
                .placeholder {
                  width: 100%;
                  height: 200px;
                  object-fit: cover;
                  object-position: top center;
                  grid-row: 1 / -1;
                  grid-column: 1 / -1;
                  transition: opacity 500ms;
                }
                .full {
                  width: 100%;
                  height: 200px;
                  object-fit: cover;
                  object-position: top center;
                  grid-row: 1 / -1;
                  grid-column: 1 / -1;
                }
                .fadeOut {
                  opacity: 0;
                }
                .loading-spinner {
                  margin-top: 5%;
                  width: 64px;
                  height: 64px;
                  border: 4px rgba(0, 0, 0, .25) solid;
                  border-top: 4px rgba(186, 213, 234, 1) solid;
                  border-radius: 50%;
                  animation: spin .6s infinite linear;
                }
                .guess-form {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  font-family: Helvetica, sans-serif;
                }
                .guess-form__item {
                  margin: 10px;
                }
                .next-btn {
                  display: block;
                  background-color: #f0b084;
                  border-color: #f0b084;
                  font-family: 'Star Wars', fantasy;
                  font-size: 1rem;
                  outline: none;
                  border-radius: 5px;
                  box-shadow: -1px 1px 5px black;
                }
                @keyframes spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(359deg); }
                }
                @media screen and (max-width: 600px) {
                  .guess-form {
                    align-items: flex-start;
                    flex-flow: column;
                  }
                  .next-btn {
                    align-self: center;
                  }
                }
              </style>
            </head>

            <body>
              <div id="app">${markup}</div>
            </body>
          </html>
        `
      )
    })
    .catch(next)
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

// app.listen(3000, () => {
//     console.log(`Server is listening on port: 3000`);
// });

module.exports.handler = serverless(app);