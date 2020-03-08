const { User, UserData, Photo } = require('../models');
const { validationResult } = require('express-validator');
const resize = require('../config/resize');
exports.user = async function(req, res){
    if(req.user){
        res.send(req.user["UserDatum"]);
    }
    else{
        res.status(404).send('invalid auth token');
    }
}
exports.setUser = async function(req, res){
    if(!req.user){
        res.status(404).send('invalid auth token');
    }
    if(!req.body.bio && !req.body.date && !req.body.gender && !req.body.interstIn){
        res.status(400).send('Missing data');
    }
    if(req.user["dataValues"].UserDatumId){
        let userData = UserData.updateInfo(req.body, req.user["dataValues"].UserDatumId); 
        res.send(userData);
    }
    else{
        res.status(400).send('Error missing id');
    }
}
exports.photo = async function(req, res){
    if(!req.user){
        res.status(400).send('Invalid token');
    }
    try{
        resize(req.file.path);
        Photo.updatePhoto(req.file.path, req.user["dataValues"].UserDatumId);
        res.send('Success');
    }
    catch(err){
        console.log(err);
        return(err);
    }
    
   
    
}
exports.getPhoto = async function(req, res){
    let data = await User.findRandom();
    console.log(data);
    res.json( data );
}
