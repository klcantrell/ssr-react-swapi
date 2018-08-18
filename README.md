# Star Wars Guess Who Game

### Guess the random character and see how high you can get your streak of correct guesses.

This is a React app that challenges the user to guess the name of random Star Wars characters.  For a snappy initial load, the app gets server-side rendered with the first random character.  The app keeps track of the user's streak of correct guesses, and should the user desire they can sign up for an account to keep track of their current streak.

User can:

* Play the game and try to select the name of the character displayed in the random image
* Sign up for an account to save their streak score

Tech Highlights:

* Used **AWS Lambda** running **Node** to server-side render the initial load of the app
* Used **AWS Lambda** running **Node** to handle authentication with **JWTs**
* Used **React** for rendering the UI and managing app state
* Used **AWS RDS** running **PostgreSQL** to persist the user's streak if they choose to sign up

#### Visit the site!
#### https://swguesswho.kalalau-cantrell.me/
