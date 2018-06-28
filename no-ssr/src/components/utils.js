const html = (literals, ...customs) => {
  let result = '';
  customs.forEach((custom, i) => {
    const lit = literals[i];
    if (Array.isArray(custom)) {
      custom = custom.join('');
    }
    result += lit;
    result += custom;
  });
  result += literals[literals.length - 1];
  return result;
}

const randomInt = upperLimit => {
  return Math.floor(Math.random() * (upperLimit + 1));
};

export { html, randomInt };