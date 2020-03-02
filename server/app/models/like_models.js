module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
      data: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }, {});
    Like.associate = function(models) {
        Like.belongsTo(models.User);
        Like.belongsTo(models.User,{as:"userLiked"});
    };
    return Like;
  };