module.exports = (sequelize, DataTypes) => {
    const UserData = sequelize.define('UserData', {
      date: {
        type: DataTypes.DATEONLY
      },
      gender:{
        type: DataTypes.STRING
      },
      interestIn:{
        type: DataTypes.STRING
      },
      bio:{
        type: DataTypes.TEXT
      }
    }, {});
    UserData.associate = function(models) {
      UserData.belongsTo(models.User);  
      UserData.hasMany(models.Photo);
      UserData.hasMany(models.Like);
    };
    UserData.findRandom = async function (){
      const { Photo } = sequelize.models;
      return UserData.findAll({ order: [sequelize.fn( 'RAND' )], limit: 10, include: Photo });
    }
    return UserData;
  };