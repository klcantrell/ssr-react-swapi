# Star Wars Guess Who Game

### Guess the random character and see how high you can get your streak of correct guesses.

This is a React app that challenges the user to guess the name of a random Star Wars character.  Whether right or wrong, the app lets the user know then sends another random character.  For a snappy initial load, the app gets server-side rendered with the first random character.  Every subsequent random character is fetched with AJAX and client-side rendered.  The app keeps track of the user's streak of correct guesses.  Should the user desire, they can sign up for an account to keep track of their current streak.

User can:

* Play the game and try to select the name of the correct displayed in the random image
* Sign up for an account to save their streak score

Tech Highlights:

* Used **AWS Lambda** running **Node** to server-side render the initial load of the app
* Used **AWS Lambda** running **Node** to handle authentication with **JWTs**
* Used **React** for rendering the UI and managing app state
* Used **AWS RDS** running **PostgreSQL** to persist the user's streak if they choose to sign up
