const sessionIdOfUsers = new Map();

function setUser(id, user) {
  sessionIdOfUsers.set(id, user);
}

function getUser(id) {
  return sessionIdOfUsers.get(id);
}


module.exports = { setUser, getUser};
