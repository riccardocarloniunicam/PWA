const { Op } = require("sequelize");
const Conversation   = require("./").Conversation;
module.exports = (sequelize, DataTypes, Match) => {
    const Like = sequelize.define('Like', {
      data: {
        type: DataTypes.DATEONLY
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
        data: new Date(),
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
        if(other){
          const { Conversation } = sequelize.models;
          return await Conversation.create({
            user1: liked,
            user2: id
          });
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