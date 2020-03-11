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
  }, {
    timestamps: false,
  });
  User.associate = function(models) {
    User.belongsTo(models.UserData);
    User.hasMany(models.AuthToken);

  };
  User.authenticate = async function(username, password) {

    const user = await User.findOne({ where: { username } });
    if (password === user.password) {
      console.log(user);
      return user.authorize();
    }
    throw new Error('invalid password');
  }
  User.prototype.authorize = async function () {
    const { AuthToken } = sequelize.models;
    const user = this;
  
    const authToken = await AuthToken.generate(this.id);

    await user.addAuthToken(authToken);
    return { authToken };
  };
  return User;
};