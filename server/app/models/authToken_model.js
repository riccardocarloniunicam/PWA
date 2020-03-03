const crypto = require('crypto');
module.exports = (sequelize, DataTypes) => {

  const AuthToken = sequelize.define('AuthToken', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});

  // set up the associations so we can make queries that include
  // the related objects
  AuthToken.associate = function ({ User }) {
    AuthToken.belongsTo(User);
  };

  AuthToken.generate = async function (UserId) {
  
    if (!UserId) {
      
      throw new Error('AuthToken requires a user ID');
    }
    let token = '';
    token = crypto.createHash('sha256').update((UserId + Math.random()).toString()).digest('hex');
    const old = await AuthToken.findOne({where: {UserId} });
    if(old){
      AuthToken.update({token},{
        where:{UserId},
      });
      return await AuthToken.findOne({where: {UserId} });
    }
    else{
      return await AuthToken.create({ token, UserId });
    }
  }
  return AuthToken;
};