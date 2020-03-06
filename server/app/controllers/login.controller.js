const {User, UserData} = require('../models');
const { validationResult } = require('express-validator/check');
exports.register = async function(req, res){
    if(req.username || req.password){
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
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                UserDatumId: userData["dataValues"].id
            }
        );
        let data = await user.authorize();
 
        return res.json( data["authToken"].token );
    }
    catch(err){
        return res.status(400).send(err["errors"][0].message.split('.')[1].split(" ")[0] + " is already present in the database");
    }
}
exports.login = async function(req, res){
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).send('missing username or password');
    }
    try{
        let user = await User.authenticate(username, password);
        return res.json( {"token":user["authToken"].token} );
    }
    catch(err){
        return res.status(400).send('invalid username or password');
    }
}

