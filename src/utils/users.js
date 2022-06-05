const users = [];

const addUser = ({ id, username, room }) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (!username || !room) {
    return {
      error: "You need to provide a valid user and room",
    };
  }

  const exUser = users.find((user) => {
    return user.username === username && user.room === room;
  });

  if (exUser) {
    return {
      error: "Sorry that username is already in use",
    };
  }

  const user = {
    id,
    username,
    room,
  };
  users.push(user);

  return {
    user,
  };
};

const removeUser = (id) => {
  const userInd = users.findIndex((user) => user.id === id);

  if (userInd !== -1) {
    return users.splice(userInd, 1)[0];
  }
};

const getUser = (id) => {
  const user = users.find((usr) => usr.id === id);
  return user;
};

const getUserinRoom = (room) => {
  const romUser = users.filter((usr) => usr.room === room);
  return romUser;
};

module.exports = {
  getUser,
  getUserinRoom,
  removeUser,
  addUser,
};
