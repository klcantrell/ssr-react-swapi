const bcrypt = require('bcrypt-node');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING
  }, {});
  User.associate = models => {
    User.hasOne(models.Score, {
      foreignKey: 'userId',
      as: 'score',
    });
  };
  User.beforeCreate((user, options) => {
    const p = new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          return reject(err);
        }
        bcrypt.hash(user.password, salt, null, (err, hash) => {
          if (err) {
            return reject(err);
          }
          resolve(hash);
        });
      });
    });
    return p.then(hash => {
      user.password = hash;
    });
  });
  User.prototype.validPassword = function(password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  };
  return User;
};