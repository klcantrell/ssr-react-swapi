import React, { Component } from 'react'
import Game from './Game';
import { QUESTION_STATES } from './Question';
import LoadingSpinner from './LoadingSpinner';
import { reqNewGame } from '../js/api';

class App extends Component {
  state = { 
    correctCharacter: undefined,
    optionsData: undefined,
    questionImg: {src: undefined},
    questionState: QUESTION_STATES.QUESTION,
    imgLoaded: false,
    initialDataLoaded: false,
    ajaxDataLoaded: 'initial',
  };

  componentDidMount() {
    reqNewGame()
      .then(({correctCharacter, optionsData, questionImg}) => {
        this.setState({
          correctCharacter,
          optionsData,
          questionImg,
          initialDataLoaded: true,
        });
      })
  }

  handleGuess = guess => {
    const { correctCharacter } = this.state;
    let questionState = guess === correctCharacter ?
      QUESTION_STATES.CORRECT :
      QUESTION_STATES.WRONG;
    this.setState({
      questionState,
    })
  }

  handleNext = () => {
    const { correctCharacter } = this.state;
    this.setState({
      imgLoaded: false,
      ajaxDataLoaded: false,
      questionState: QUESTION_STATES.QUESTION,
    })
    reqNewGame(correctCharacter)
      .then(({correctCharacter, optionsData, questionImg}) => {
        this.setState({
          correctCharacter,
          optionsData,
          questionImg,
          ajaxDataLoaded: true,
        })
      });
  }

  handleImgLoad = () => {
    this.setState({
      imgLoaded: true,
    })
  };

  render() {
    const { 
      ajaxDataLoaded,
      initialDataLoaded,
      imgLoaded,
      questionImg,
      optionsData,
      questionState } = this.state;

    return (
      <React.Fragment>
        <h1>May the force be with you</h1>
        {ajaxDataLoaded ? (
          <Game 
            initialDataLoaded={initialDataLoaded}
            questionState={questionState}
            questionImg={questionImg}
            optionsData={optionsData}
            imgLoaded={imgLoaded}
            handleImgLoad={this.handleImgLoad}
            handleGuess={this.handleGuess}
            handleNext={this.handleNext}
          />
        ) : (
          <LoadingSpinner />
        )}
      </React.Fragment>
    );
  }
}

export default App;