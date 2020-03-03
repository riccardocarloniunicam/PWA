const auth = require('../middleware/authMiddeware');
module.exports = function(app){
    var login = require('../controllers/login.controller');
    var user = require('../controllers/user.controller');
    app.route('/register')
        .post(login.register);
    app.route('/login')
        .post(login.login);
        app.route('/user')
        .post(auth, user.user);
        app.route('/getUsers')
        .get(auth, user.getPhoto);
};