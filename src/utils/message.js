const generateMsg = (username, txt) => {
  const date = new Date().getTime();
  return {
    username,
    text: txt,
    createdAt: date,
  };
};

const generateLoc = (username = "Admin", cordinate) => {
  const date = new Date().getTime();
  return {
    username,
    cordinate,
    createdAt: date,
  };
};

module.exports = {
  generateMsg,
  generateLoc,
};
