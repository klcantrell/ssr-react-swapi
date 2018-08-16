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

const signup = (email, password, score) => {
  const url = `${__DB__}/signup`;
  const data = { email, password, score };
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

const updateScore = score => {
  const url = `${__DB__}/score`;
  const data = { score };
  return fetch(url, {
    method: 'PUT',
    headers: {
      authorization: localStorage.getItem('token'),
    },
    body: JSON.stringify(data),
  });
};

const getScore = () => {
  const url = `${__DB__}/score`;
  return fetch(url, {
    headers: {
      authorization: localStorage.getItem('token'),
    },
  }).then(res => res.json());
};

export { reqResetGame, signup, signin, updateScore, getScore };