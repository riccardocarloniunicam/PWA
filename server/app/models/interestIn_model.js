module.exports = (sequelize, DataTypes) => {
    const InterestIn = sequelize.define('InterestIn', {
      gender: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      minAge: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
      },
      maxAge: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
      }
    }, {});
    InterestIn.associate = function(models) {
        InterestIn.hasMany(models.User);
    };
    return InterestIn;
  };