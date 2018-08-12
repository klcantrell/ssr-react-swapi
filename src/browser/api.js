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

const signup = (email, password) => {
  const url = `${__DB__}/signup`;
  const data = { email, password };
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then(res => res.json());
};

const signin = (email, password) => {
  const url = `${__DB__}/signin`;
  const data = { email, password };
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then(res => res.json());
};

export { reqResetGame, signup, signin };