const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'cloudstrife@ff.com',
        password: bcrypt.hashSync('admin', bcrypt.genSaltSync(10)),
      },
      {
        email: 'squallleonhart@ff.com',
        password: bcrypt.hashSync('admin', bcrypt.genSaltSync(10)),
      }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
