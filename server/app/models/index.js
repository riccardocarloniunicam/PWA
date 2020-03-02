var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');

var basename = path.basename(__filename);

var root = path.dirname(require.main.filename);
var env = process.env.NODE_ENV || 'developement';
var config = require(root + '\\app\\config\\config.json')[env];

var db = {};
var sequelize = new Sequelize(
    config.database, config.username, config.password, {
        host: config.host,
        dialect: config.dialect
    }
);
fs
    .readdirSync(__dirname)
    .filter(file =>{
        return (file.indexOf('.') !== 00)
        && (file !== basename)
        && (file.slice(-3) === '.js');
    })
    .forEach(file =>{
        var model = sequelize.import(path.join(__dirname, file));
       db[model.name]  = model;
    });
    
    Object.keys(db).forEach(modelName => {
        if(db[modelName].associate){
            db[modelName].associate(db);
        }
    });
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    
    module.exports = db;

