const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'users.json');

// データベースファイルが存在しない場合は作成
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify([], null, 2));
}

// データベース操作のヘルパー関数
const readUsers = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeUsers = (users) => {
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
};

const findUserByEmail = (email) => {
  const users = readUsers();
  return users.find(user => user.email === email);
};

const createUser = (userData) => {
  const users = readUsers();
  const newUser = {
    id: users.length + 1,
    ...userData,
    created_at: new Date().toISOString()
  };
  users.push(newUser);
  writeUsers(users);
  return newUser;
};

module.exports = {
  findUserByEmail,
  createUser,
  readUsers
};
