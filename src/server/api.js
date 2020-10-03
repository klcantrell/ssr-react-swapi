import fetch from 'isomorphic-fetch';

const fetchCharacterInfo = (characterId = '1') => {
  const encodedURI = encodeURI(`https://swapi.dev/api/people/${characterId}`);

  return fetch(encodedURI)
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => {
      console.warn(error);
      return null;
    });
};

export { fetchCharacterInfo };
