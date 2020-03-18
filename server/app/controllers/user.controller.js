const { User, UserData, Photo, Like, Conversation, Message } = require('../models');
const { validationResult } = require('express-validator');
const resize = require('../services/resize');
exports.user = async function(req, res){
    if(req.user){
        const data = req.user.toJSON();
        const user = data["UserDatum"];
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
    if(!req.body.bio && !req.body.date && !req.body.gender && !req.body.interest && !req.body.name){
        res.status(400).send('Missing data');
    }
    
    if(req.user){
        const json = req.user.toJSON();
        let userData = UserData.updateInfo(req.body, json["UserDatumId"]); 
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
        const json = req.user.toJSON();
        const photo = await Photo.updatePhoto(req.file.path, json["UserDatumId"]);
        res.json({"url": (photo.toJSON().url)});
    }
    catch(err){
        res.status(400).send(err);
    }   
}
exports.getUsers = async function(req, res){
    if(!req.user){
        res.status(400).send('Invalid token');
    }
    try{
       const json = req.user.toJSON();
       console.log(json);
        const data = await UserData.findRandom(req.user["UserDatum"].dataValues);
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
        const json = req.user.toJSON();
        const like = await Like.iLike(json["UserDatumId"], req.body.liked, req.body.like);
        res.send(like);
        
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }
}

exports.getMessages = async function(req, res){
    if(!req.user){
        res.status(400).send('Invalid token');
    }
    if(!req.body.id){
        res.status(400).send('Error retrieving message try later');
    }
    try{
        const conversation = await Message.getMessages(req.body.id, req.user["UserDatumId"]);
        res.send(conversation);
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }
}
exports.sendMessage = async function(req, res){
    if(!req.user){
        res.status(400).send('Invalid token');
    }
    if(!req.body.id || !req.body.message){
        res.status(400).send('Error retrieving message try later');
    }
    try{
        const message = Message.writeMessage(req.body.id, req.user["UserDatumId"], req.body.message);
        res.send(message);
    }
    catch(err){
 
        res.status(400).send(err);
    }
}