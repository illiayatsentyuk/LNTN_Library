const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "users.json"
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
    getUsersFromFile((user) => {
      user.push(this);
      fs.writeFile(p, JSON.stringify(user), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getUsersFromFile(cb);
  }

  static findById(id, cb) {
    getUsersFromFile((users) => {
      const user = users.find((p) => p.id == id);
      cb(user);
    });
  }
};
