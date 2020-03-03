const jwt = require('jsonwebtoken');
module.exports = (sequelize, DataTypes) => {

  const AuthToken = sequelize.define('AuthToken', {
    secret:{
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
    let secret = '';
    secret = crypto.createHash('sha256').update((UserId + Math.random()).toString()).digest('hex');
    AuthToken.create({secret, UserId});
    const token = jwt.sign({UserId}, secret);
  }
  return AuthToken;
};