const { User } = require('../models');
const { AuthToken } = require('../models');
module.exports = async function(req, res, next){
    const token = req.headers.authorization;
    if(!token) return res.status(401).json({message: "Auth Error"});
        const authToken = await AuthToken.findOne( {where: { token }, include:  [User]});
        if(authToken){
            req.user = authToken.User;
            next();
        }
        else{
            res.status(500).send({ message: "Invalid Token" });
        }
}