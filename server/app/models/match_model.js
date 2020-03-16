module.exports = (sequelize, DataTypes) => {
    const Match = sequelize.define('Match', {
    }, {
        
      timestamps: false,
    });
    Match.associate = function(models) {
        Match.belongsTo(models.Like, {foreignKey: 'likeId'});
        Match.belongsTo(models.Like, {foreignKey: 'BeingLikedId'});
    };
    return Match;
  };