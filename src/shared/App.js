import React, { Component } from 'react'
import Character from './Character';
import Question, { QUESTION_STATES } from './Question';
import { reqRandomCharacter } from '../browser/api';
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

  handleNext = () => {}

  handleImgLoad = () => {
    this.setState({
      imgLoaded: true,
    })
  };

  render() {
    const { dataLoaded, imgLoaded, questionImg, optionsData, questionState } = this.state;
    return (
      <React.Fragment>
        <Character
          dataLoaded={dataLoaded}
          imgLoaded={imgLoaded}
          handleLoad={this.handleImgLoad}
          imgData={questionImg}
          questionState={questionState}
        />
        <Question 
          options={optionsData}
          questionState={questionState}
          handleGuess={this.handleGuess} 
        />
      </React.Fragment>
    );
  }
}

export default App;