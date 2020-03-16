const { Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const UserData = sequelize.define('UserData', {
      name: {
        type: DataTypes.STRING
      },
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
        name: body.name,
        bio: body.bio,
        gender: body.gender,
        interestIn: body.interest,
        date: date
      }, {
          where: {id}
        } 
    );
    }
    UserData.findRandom = async function (user){
      try{
        const { Photo } = sequelize.models;
        return UserData.findAll({ 
          where: { 
            [Op.and]: [
              {id: {
                  [Op.ne]: user.id
                }
              },
              {gender: user.interestIn},
              {interestIn: user.gender}
            ]
          
          },
          order: [sequelize.fn( 'RAND' )],
          limit: 15,
          include: Photo });
      }
      catch(err){
        console.log(err);
        return err;
      }
      //console.log(user);
      //console.log(data);
      //return "a";
      /*const { Photo } = sequelize.models;
      return UserData.findAll({ 
        where: { 
          id: {
            [Op.ne]: id
          },
          gender:   
        },
        order: [sequelize.fn( 'RAND' )],
        limit: 4,
        include: Photo });*/
    }
    return UserData;
  };
