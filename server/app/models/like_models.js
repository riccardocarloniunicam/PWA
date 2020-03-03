module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
      data: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }, {});
    Like.associate = function(models) {
        Like.belongsTo(models.UserData);
        Like.belongsTo(models.UserData,{as:"userLiked"});
    };
    return Like;
  };