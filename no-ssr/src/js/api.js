const reqNewGame = (currentCorrectCharacterIndex = undefined) => {
  let url = `${__API_BASE__}/api/resetGame/`;
  if (currentCorrectCharacterIndex) {
    url += currentCorrectCharacterIndex;
  }

  return fetch(url)
    .then(res => res.json())
    .then(data => data)
    .catch(error => {
      console.warn(error);
      return null;
    });
};

export { reqNewGame };