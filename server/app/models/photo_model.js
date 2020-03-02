module.exports = (sequelize, DataTypes) => {
    const Photo = sequelize.define('User', {
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      }
    }, {});
    Photo.associate = function(models) {
    };
    return Photo;
  };