import React from 'react';
import { QUESTION_STATES } from './Question';
import { randomInt } from './utils';

const INSULTS = ['oohhh, looks like the force is not with you', 'much to learn, you still have'];
const PRAISES = ['the force is strong with this one', 'powerful, you have become']

const GameMessage = ({questionState}) => {
  const renderMessage = questionState => {
    switch(questionState) {
      case QUESTION_STATES.QUESTION:
        return 'Guess the character'
      case QUESTION_STATES.WRONG:
        return INSULTS[randomInt(INSULTS.length - 1)];
      case QUESTION_STATES.CORRECT:
        return PRAISES[randomInt(PRAISES.length - 1)];
    }
  };
  return <h2 className="game-message">{renderMessage(questionState)}</h2>;
}

export default GameMessage;