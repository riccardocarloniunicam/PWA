const { User, UserData, Photo, Like } = require('../models');
const { validationResult } = require('express-validator');
const resize = require('../services/resize');
exports.user = async function(req, res){
    if(req.user){
        const user = req.user["UserDatum"];
        console.log(req.user["UserDatum"].id);
        const photo = await Photo.getPhoto(user.id);
        let json = {
            user,
            photo
        }
        res.json( json );
    }
    else{
        res.status(400).send('invalid auth token');
    }
}
exports.setUser = async function(req, res){
    if(!req.user){
        res.status(400).send('invalid auth token');
    }
    if(!req.body.bio && !req.body.date && !req.body.gender && !req.body.interest){
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
        res.status(400).send(err);
    }   
}
exports.getUsers = async function(req, res){
    if(!req.user){
        res.status(400).send('Invalid token');
    }
    try{
        //console.log(req.user["UserDatum"].dataValues);
        const data = await UserData.findRandom(req.user["UserDatum"].dataValues);
        //console.log(data);
        //res.send(req.user);
        res.send( data );
    }
    catch(err){
        res.status(400).send(err);
    }
  
}
exports.like = async function(req, res){
    if(!req.user){
        res.status(400).send('Invalid token');
    }
    try{
        const like = await Like.iLike(req.user["dataValues"].UserDatumId, req.body.liked, req.body.like);
        res.send(like);
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }
}