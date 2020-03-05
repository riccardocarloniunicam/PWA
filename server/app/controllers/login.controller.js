const {User} = require('../models');
exports.register = async function(req, res){
    try{
        let user = await User.create(
            {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }
        );
        let data = await user.authorize();
     
        return res.json( data );
    }
    catch(err){
        console.log(err);
        return res.status(400).send(err);
    }
}
exports.login = async function(req, res){
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).send('missing username or password');
    }
    try{
        let user = await User.authenticate(username, password);
        return res.json( user );
    }
    catch(err){
        return res.status(400).send('invalid username or password');
    }
}

