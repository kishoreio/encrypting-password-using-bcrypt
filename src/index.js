const bcrypt = require("bcrypt");
const saltRounds = 10;

//function to hash the plain password
const generateHash = (plainPassword) => {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) reject(err);
      bcrypt.hash(plainPassword, salt, function(err, hashPassword) {
        err ? reject(err) : resolve(hashPassword);
      });
    });
  });
};

//function to compare the plainPassword and hashedPassword
const compareHash = (plainPassword, hashPassword) => {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(plainPassword, hashPassword, function(err, hashResult) {
      err ? reject(err) : resolve(hashResult);
    });
  });
};

const plainPassword = "admin@123";
generateHash(plainPassword)
  .then((result) => {
    compareHash(plainPassword, result)
      .then((newResult) => {
        console.log(newResult);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });
