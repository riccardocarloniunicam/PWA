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
    }, {
      timestamps: false,
    });
    UserData.associate = function(models) {
      UserData.hasOne(models.User);  
      UserData.hasMany(models.Photo);
      UserData.hasMany(models.Like);
    };
    UserData.updateInfo =  async function(body, id){
      var date = body.date;
      console.log(date);
      if(body.date){
        date = new Date(body.date * 1000);
      }
      return UserData.update({
        bio: body.bio,
        gender: body.gender,
        interestIn: body.interestIn,
        date: date
      }, {
          where: {id}
        } 
    );
    }
    UserData.findRandom = async function (){
      const { Photo } = sequelize.models;
      return UserData.findAll({ order: [sequelize.fn( 'RAND' )], limit: 10, include: Photo });
    }
    return UserData;
  };
