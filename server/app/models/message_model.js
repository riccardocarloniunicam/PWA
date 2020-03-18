module.exports = (sequelize, DataTypes) => {

    const Message = sequelize.define('Message', {
    }, {
      timestamps: false,
    });
  
    // set up the associations so we can make queries that include
    // the related objects
    Message.associate = function (models) {
     Message.belongsTo(models.Conversation);
    };
    return Message;
  };