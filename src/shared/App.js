import React, { Component } from 'react'
import Game from './Game';
import { QUESTION_STATES } from './Question';
import LoadingSpinner from './LoadingSpinner';
import { reqResetGame } from '../browser/api';
import { randomInt } from './utils';

class App extends Component {
  state = { 
    ...this.initializeState(this.props.data),
    imgLoaded: false,
    serverDataLoaded: false,
    ajaxDataLoaded: 'initial',
    questionState: QUESTION_STATES.QUESTION,
  };

  initializeState({correctCharacter, optionsData, questionImg }) {
    return {
      correctCharacter,
      optionsData,
      questionImg,
    };
  }

  componentDidMount() {
    this.setState({
      serverDataLoaded: true,
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
    reqResetGame(correctCharacter)
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
      serverDataLoaded,
      imgLoaded,
      questionImg,
      optionsData,
      questionState } = this.state;

    return (
      <React.Fragment>
        <h1>May the force be with you</h1>
        {ajaxDataLoaded ? (
          <Game 
            serverDataLoaded={serverDataLoaded}
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