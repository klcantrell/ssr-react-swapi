const bcrypt = require('bcrypt');

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
    return bcrypt.genSalt(10)
      .then(salt => {
        // needed to return the promise here for hook to fire
        return bcrypt.hash(user.password, salt)
          .then(hash => {
            user.password = hash;
          }).catch(err => {
            return sequelize.Promise.reject(err);
          })
      }).catch(err => {
        return sequelize.Promise.reject(err);
      })
  });
  User.prototype.validPassword = function(password) {
    return bcrypt.compare(password, this.password)
      .then(res => {
        return res;
      }).catch(err => {
        return err;
      });
  };
  return User;
};