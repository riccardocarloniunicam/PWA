const {User} = require('../models');
exports.user = async function(req, res){
    if(req.user){
        res.send(req.user);
    }
    else{
        res.status(404).send('missing auth token');
    }
}

exports.getPhoto = async function(req, res){
    let data = await User.findRandom();
    console.log(data);
    res.json( data );
}