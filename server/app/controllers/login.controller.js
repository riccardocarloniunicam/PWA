const {User, UserData, Photo } = require('../models');
const { validationResult } = require('express-validator/check');
exports.register = async function(req, res){
    if(req.email || req.password){
        return res.status(400).send(errors.array()[0]);
    }
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send(errors.array()[0].msg);
    }
    try{
        let userData = await UserData.create();
        let user = await User.create(
            {
                email: req.body.email,
                password: req.body.password,
                UserDatumId: userData["dataValues"].id
            }
        );
        let photo = await Photo.create({ UserDatumId: userData["dataValues"].id });
        let data = await user.authorize();
        return res.send( data["authToken"].token );
    }
    catch(err){
        console.log(err);
        return res.status(400).send(err);
        //return res.status(400).send(err["errors"][0].message.split('.')[1].split(" ")[0] + " is already present in the database");
    }
}
exports.login = async function(req, res){
    console.log(req.body);
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).send('missing username or password');
    }
    try{
        let user = await User.authenticate(username, password);
        //console.log(user);
        //console.log(user["authToken"].token);
        return res.send( user["authToken"].token );
    }
    catch(err){
        return res.status(400).send('invalid username or password');
    }
}

