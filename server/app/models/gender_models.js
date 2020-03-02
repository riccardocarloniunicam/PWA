module.exports = (sequelize, DataTypes) => {
    const Gender = sequelize.define('Gender', {
      value: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      }
    }, {});
    Gender.associate = function(models) {
        Gender.hasMany(models.User);
    };
    return Gender;
  };