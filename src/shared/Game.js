import React from 'react';
import GameMessage from './GameMessage';
import Character from './Character';
import Question from './Question';
import LoadingSpinner from './LoadingSpinner';

const Game = props => {
  const {
    serverDataLoaded,
    questionState,
    questionImg,
    optionsData,
    imgLoaded,
    handleImgLoad,
    handleGuess,
    handleNext } = props;

  return (
    <React.Fragment>
      <GameMessage questionState={questionState} />
      <Character
        imgLoaded={imgLoaded}
        handleLoad={handleImgLoad}
        imgData={questionImg}
      />
      {serverDataLoaded ? (
        <Question 
          options={optionsData}
          questionState={questionState}
          handleGuess={handleGuess}
          handleNext={handleNext} 
        />
      ) : (
        <LoadingSpinner />
      )}
    </React.Fragment>
  );
};

export default Game;