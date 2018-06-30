import { randomInt } from '../shared/utils';

const SWAPI_PEOPLE_COUNT = 87;

const resetGame = (correctCharacter, fetchMethod) => {
  let options = Array(4).fill();
  options[randomInt(3)] = correctCharacter;
  options = options.reduce((acc, opt) => {
    if (opt) {
      acc.push(opt)
      return acc;
    } else {
      let optValue;
      do {
        optValue = randomInt(SWAPI_PEOPLE_COUNT) + 1;
      } while (acc.indexOf(optValue) !== -1 || optValue == correctCharacter)
      acc.push(optValue);
      return acc;
    }
  }, []);

  return Promise.all(options.map(opt => {
    return fetchMethod(opt)
      .then(resp => ({
        name: resp.name,
        id: opt,
      }))
  }))
}

export default resetGame;