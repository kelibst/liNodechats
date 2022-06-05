const generateMsg = (txt, username = "Admin") => {
  const date = new Date().getTime();
  return {
    username,
    text: txt,
    createdAt: date,
  };
};

const generateLoc = (username, cordinate) => {
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
