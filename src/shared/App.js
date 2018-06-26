import React, { Component } from 'react'
import Character from './Character';
import Question, { QUESTION_STATES } from './Question';
import LoadingSpinner from './LoadingSpinner';
import { reqResetGame } from '../browser/api';
import { randomInt } from './utils';

class App extends Component {
  state = { 
    ...this.initializeState(this.props.data),
    imgLoaded: false,
    dataLoaded: false,
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
      dataLoaded: true,
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
    this.setState({
      imgLoaded: false,
      dataLoaded: false,
      questionState: QUESTION_STATES.QUESTION,
    })
    reqResetGame()
      .then(({correctCharacter, optionsData, questionImg}) => {
        this.setState({
          correctCharacter,
          optionsData,
          questionImg,
          dataLoaded: true,
        })
      });
  }

  handleImgLoad = () => {
    this.setState({
      imgLoaded: true,
    })
  };

  render() {
    const { dataLoaded, imgLoaded, questionImg, optionsData, questionState } = this.state;
    return (
      <React.Fragment>
        <h1 className="game-header">May the force be with you</h1>
        <Character
          imgLoaded={imgLoaded}
          handleLoad={this.handleImgLoad}
          imgData={questionImg}
          questionState={questionState}
        />
        {dataLoaded ? (
          <Question 
            options={optionsData}
            questionState={questionState}
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