module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define('Score', {
    value: {
      type: DataTypes.INTEGER,
    },
  }, {});
  Score.associate = models => {
    Score.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });
  }
  return Score;
};