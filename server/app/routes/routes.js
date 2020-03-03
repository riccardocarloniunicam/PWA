
module.exports = function(app){
    var login = require('../controllers/user.controller');
    app.route('/register')
        .post(login.register);
    app.route('/login')
        .post(login.login);
    app.route('/user')
        .get(login.user);

};
