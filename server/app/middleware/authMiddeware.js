const { User, AuthToken} = require('../models');

module.exports = async function(req, res, next){
    const token = req.headers.authorization;
    if(token){
        const authToken = await AuthToken.findOne( {where: { token }, include: User});
        if(authToken){
            req.user = authToken.User;
        }
    }
    next();
}