const { Op } = require("sequelize");
const { Match } = require('../models');
module.exports = (sequelize, DataTypes, Match) => {
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
    Like.iLike = async function(id, liked, status){
      const bool = status==='like' ? 1 : 0;
      const  like = await Like.create({
        like: bool,
        userLiked: liked,
        UserDatumId: id,
      });
      console.log(like["dataValues"].id);
      if(status === 'like'){
        const other = await Like.findOne({
          where:{
            [Op.and]: [
              {userLiked: id},
              {UserDatumId: liked},
              {like: true}
            ]
          }
        });
        console.log(other);
        if(other){
          
        }
        else{
          return like;
        }
      }
      else{
        return like;
      }
    }
    return Like;
  };