export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const genetateCaptcha = (max: number) => {
  let text = '';
  let i;
  for (i = 0; i < max; i += 1) {
    switch (Math.floor(Math.random() * 3)) {
      case 0:
        text += String.fromCharCode(48 + Math.floor(Math.random() * 10));
        break;
      case 1:
        text += String.fromCharCode(65 + Math.floor(Math.random() * 26));
        break;
      case 2:
        text += String.fromCharCode(97 + Math.floor(Math.random() * 26));
        break;
      default:
        break;
    }
  }
  return text;
};
