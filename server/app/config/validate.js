const { body } = require('express-validator')

module.exports = function(method){
    switch(method){
        case 'register': {
            return [
              body('email','Email must be valid').isEmail(),
              body('password','password must be between 7 and 50 characters').isLength({min:7, max:50})
            ]
        }
    }
}
