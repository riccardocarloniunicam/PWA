
const jwt  = require('jsonwebtoken');
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {});
    User.associate = function(models) {
      User.hasMany(models.AuthToken);
      User.belongsTo(models.Gender);
      User.belongsTo(models.InterestIn);
      User.hasMany(models.Like);
    };
    User.authenticate = async function(username, password) {

      const user = await User.findOne({ where: { username } });
  
      
      if (password == user.password) {
        return user.authorize();
      }
  
      throw new Error('invalid password');
    }

    User.prototype.authorize = async function () {
      const { AuthToken } = sequelize.models;
      const user = this;
    
      const authToken = await AuthToken.generate(this.id);

      await user.addAuthToken(authToken);
      return { user, authToken };
    };
    User.generateToken = async function(payload){
    }
    return User;
  };