const generateMsg = (txt) => {
  const date = new Date().getTime();
  return {
    text: txt,
    createdAt: date,
  };
};

module.exports = {
  generateMsg,
};
