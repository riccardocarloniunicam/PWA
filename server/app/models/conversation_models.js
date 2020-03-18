module.exports = (sequelize, DataTypes) => {

  const Conversation = sequelize.define('Conversation', {
  }, {
    timestamps: false,
  });

  // set up the associations so we can make queries that include
  // the related objects
  Conversation.associate = function (models) {
    Conversation.belongsTo(models.UserData, {foreignKey: "user1"});
    Conversation.belongsTo(models.UserData, {foreignKey: "user2"});
  };
  return Conversation;
};