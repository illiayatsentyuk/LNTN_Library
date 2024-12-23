const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'users.json'
);

const getUsersFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class User {
  constructor(name, password, age) {
    this.name = name;
    this.password = password;
    this.age = age;
  }

  save() {
    this.id = Math.random().toString();
    getUsersFromFile((users) => {
      users.push(this);
      fs.writeFile(p, JSON.stringify(users), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getUsersFromFile(cb);
  }

  static findUser(name, password, cb) {
    getUsersFromFile((users) => {
      if (users.length >= 1) {
        const user = users.find((p) => p.name == name);
        if (user) {
          if (password == user.password) {
            cb(user);
          } else {
            cb({ message: 'password' });
          }
        } else {
          cb({ message: 'no-user' });
        }
      } else {
        cb({ message: 'no-users' });
      }
    });
  }
  static findUserByName(name, cb) {
    getUsersFromFile((users) => {
      if (users.length >= 1) {
        const user = users.find((p) => p.name == name);
        if (user) {
          cb(true);
        } else {
          cb(false);
        }
      } else {
        cb(false);
      }
    });
  }
};
