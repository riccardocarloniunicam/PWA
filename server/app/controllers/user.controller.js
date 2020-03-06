const { User, UserData } = require('../models');
exports.user = async function(req, res){
    if(req.user){
        res.send(req.user);
    }
    else{
        res.status(404).send('invalid auth token');
    }
}
exports.setUser = async function(req, res){
    if(!req.user){
        res.status(404).send('invalid auth token');
    }
    if(req.bio && req.date && req.gender && req.interstIn){
        res.status(400).send('Missing data');
    }
    if(req.user["dataValues"].UserDatumId){
        
    }
    else{
        res.status(400).send('Error missing id');
    }
}
exports.getPhoto = async function(req, res){
    let data = await User.findRandom();
    console.log(data);
    res.json( data );
}
