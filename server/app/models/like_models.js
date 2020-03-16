module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
      data: {
        type: DataTypes.DATE
      },
      like: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    }, {
      timestamps: false,
    });
    Like.associate = function(models) {
        Like.belongsTo(models.UserData, { foreignKey:"userLiked"});
        Like.belongsTo(models.UserData);
    };
    return Like;
  };