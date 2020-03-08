const { User, UserData, AuthToken} = require('../models');

module.exports = async function(req, res, next){
    const token = req.headers.authorization;
    if(token){
        const authToken = await AuthToken.findOne({ where: {token}, include: [{
            model: User, include: [
                {model: UserData}
            ], attributes: ['UserDatumId']
        }
        ]});
        if(authToken){
            req.user = authToken.User;
        }
    }
    next();
}
