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
  
      // bcrypt is a one-way hashing algorithm that allows us to 
      // store strings on the database rather than the raw
      // passwords. Check out the docs for more detail
      if (password == user.password) {
        return user.authorize();
      }
  
      throw new Error('invalid password');
    }
  
    // in order to define an instance method, we have to access
    // the User model prototype. This can be found in the
    // sequelize documentation
    User.prototype.authorize = async function () {
      const { AuthToken } = sequelize.models;
      const user = this;
      // create a new auth token associated to 'this' user
      // by calling the AuthToken class method we created earlier
      // and passing it the user id
      const authToken = await AuthToken.generate(this.id);
      // addAuthToken is a generated method provided by
      // sequelize which is made for any 'hasMany' relationships
      await user.addAuthToken(authToken);
      return { authToken }
    };
    return User;
  };