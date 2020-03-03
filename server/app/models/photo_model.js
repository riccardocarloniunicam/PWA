module.exports = (sequelize, DataTypes) => {
    const Photo = sequelize.define('Photo', {
      url: {
        type: DataTypes.STRING,
      }
    }, {});
    Photo.associate = function(models) {
      Photo.belongsTo(models.UserData);
    };
    return Photo;
  };