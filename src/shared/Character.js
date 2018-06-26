import React, { Component } from 'react';
import { QUESTION_STATES } from './Question';
import { randomInt } from './utils';

const INSULTS = ['Oohhh, looks like the force is not with you', 'Much to learn, you still have'];
const PRAISES = ['The force is strong with this one', 'Powerful, you have become']

class Character extends Component {
  componentDidMount() {
    if (this.fullImg && this.fullImg.complete) {
      this.props.handleLoad();
    }
  }

  renderMessage = questionState => {
    switch(questionState) {
      case QUESTION_STATES.QUESTION:
        return 'Guess the character'
      case QUESTION_STATES.WRONG:
        return INSULTS[randomInt(INSULTS.length - 1)];
      case QUESTION_STATES.CORRECT:
        return PRAISES[randomInt(PRAISES.length - 1)];
    }
  }
  
  render() {
    const { questionState, imgData, imgLoaded, handleLoad } = this.props;
    let placeholderClasses = 'placeholder';
    if (imgLoaded) {
      placeholderClasses += ' fadeOut';
    }
    return (
        <div className="character">
          <h2 className="game-message">{this.renderMessage(questionState)}</h2>
          <div className="hero-img">
            <img className="full" onLoad={handleLoad} src={imgData.src} ref={node => this.fullImg = node}/>
            <img className={placeholderClasses} src={imgData.placeholder} />
          </div>
        </div>
    );
  }
};

export default Character;