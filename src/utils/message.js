const generateMsg = (txt) => {
  const date = new Date().getTime();
  return {
    text: txt,
    createdAt: date,
  };
};

const generateLoc = (cordinate) => {
  const date = new Date().getTime();
  return {
    cordinate,
    createdAt: date,
  };
};

module.exports = {
  generateMsg,
  generateLoc,
};
