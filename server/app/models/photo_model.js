module.exports = (sequelize, DataTypes) => {
    const Photo = sequelize.define('Photo', {
      url: {
        type: DataTypes.STRING,
      }
    }, {
      timestamps: false,
    });
    Photo.associate = function(models) {
      Photo.belongsTo(models.UserData);
    };
    Photo.updatePhoto = async function(path, id){
      const photo = await Photo.findOne({where: {UserDatumId: id}});
      const shortPath = path.substr(path.indexOf('\\'), path.length);
      if(!photo){
        return await Photo.create({
          url: shortPath,
          UserDatumId: id
        })
      }
      else{
        await Photo.update(
          {
            url: shortPath
        },{
          where: {
            UserDatumId: id
          }
        });
        return await Photo.findOne({where: {UserDatumId: id}});
      }
    }
    return Photo;
  };