const capitalizeFirstLetter: (string: string) => string = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const randomString = (length: number = 5) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export {capitalizeFirstLetter, randomString};
