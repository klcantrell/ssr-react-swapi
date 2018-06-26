const reqResetGame = characterIndex => {
  const url = `${__API_BASE__}/api/resetGame/`;

  return fetch(url)
    .then(res => res.json())
    .then(data => data)
    .catch(error => {
      console.warn(error);
      return null;
    });
};

export { reqResetGame };