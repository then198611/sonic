/*
* 配置路由地址
* */

var index = require('../routes/index');
var users = require('../routes/users');
var login = require('../routes/login');
var register = require('../routes/register');
var getUsers = require('../routes/getUsers');


var setRoute = function (app) {
    app.use('/', index);
    app.use('/users', users);
    app.use('/login', login);
    app.use('/getUsers', getUsers);
    app.use('/register', register);
}

module.exports = setRoute;