const auth = require('../middleware/authMiddeware');
const { body } = require('express-validator/check');
const upload = require('../middleware/uploadMiddleware');
const validate = require('../config/validate');

module.exports = function(app){
    var login = require('../controllers/login.controller');
    var user = require('../controllers/user.controller');
    app.route('/register')
        .post(validate('register'), login.register);
    app.route('/login')
        .post(login.login);
        app.route('/user')
        .get(auth, user.user)
        .post(auth, user.setUser);
    app.route('/photo')
        .post(auth, upload.single('image'), user.photo);
    app.route('/getUsers')
        .get(auth, user.getUsers);
    app.route('/like')
        .post(auth, user.like);
    app.route('/message')
        .get(auth, user.getMessages)
        .post(auth, user.sendMessage);
};