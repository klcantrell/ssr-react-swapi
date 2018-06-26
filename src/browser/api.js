const reqResetGame = currentCorrectCharacterIndex => {
  const url = `${__API_BASE__}/api/resetGame/${currentCorrectCharacterIndex}`;

  return fetch(url)
    .then(res => res.json())
    .then(data => data)
    .catch(error => {
      console.warn(error);
      return null;
    });
};

export { reqResetGame };