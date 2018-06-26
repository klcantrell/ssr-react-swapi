import React, { Component } from 'react';

const QUESTION_STATES = {
  QUESTION: 1,
  WRONG: 2,
  CORRECT: 3,
}

class Question extends Component {
  state = {
    userChoice: undefined,
  }
 
  handleChange = e => {
    this.setState({
      userChoice: Number(e.target.value),
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleGuess(this.state.userChoice);
  }

  handleNext = e => {
    e.preventDefault();
    this.props.handleNext();
  }

  render() {
    const { userChoice } = this.state;
    const { options, questionState } = this.props;
    const inQuestion = questionState === QUESTION_STATES.QUESTION;
    return (
      <form className="guess-form" onSubmit={inQuestion ? this.handleSubmit : this.handleNext}>
        {options.map(opt => (
          <label key={opt.id} className="guess-form__item">
            <input 
              type="radio"
              value={opt.id}
              checked={userChoice === opt.id}
              onChange={inQuestion ? this.handleChange : null}
            />
            {opt.name}
          </label>
        ))
        }
        <button 
          className="next-btn guess-form__item" 
          type="submit"
        >
          {inQuestion ? 'Guess' : 'Next'}
        </button>
      </form>
    );
  }
}

export default Question;
export { QUESTION_STATES };