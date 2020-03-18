const { Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {

    const Message = sequelize.define('Message', {
      msg: {
        type: DataTypes.STRING,
        allowNull: false
      },
      date: {
        type: DataTypes.DATEONLY
      }
    }, {
      timestamps: false,
    });
  
    // set up the associations so we can make queries that include
    // the related objects
    Message.associate = function (models) {
     Message.belongsTo(models.Conversation);
     Message.belongsTo(models.UserData,{foreignKey:"userId"});
    };
    Message.getMessages = async function(id, userId){
      const { Conversation } = sequelize.models;
      const conversation = await Message.findAll({
        where: {
          ConversationId: id,        
        },
        include: [
          {model: Conversation, where: {
            [Op.or]:[
              {user1:userId},
              {user2:userId}
            ]
          }}
        ]
      });
      console.log(conversation);
      if(conversation){
        return conversation;
      }
      else{
        throw new Error("Unauthorized access");
      }
    }
    Message.writeMessage = async function(id, userId, message){
      const { Conversation } = sequelize.models;
      const conversation = await Conversation.findOne({ where: {
        id: id,
        [Op.or]: [
          {user1: userId},
          {user2: userId}
        ]
      }});
      if(conversation){
        return await Message.create({
          msg: message,
          date: new Date(),
          ConversationId: id,
          userId: userId
        })
      }
      else{
        throw new Error("Unauthorized access");
      }
    }
    return Message;
  };