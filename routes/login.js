var express = require('express');
var sql = require('../modules/mysql');
var cookie = require('../modules/cookie');
var router = express.Router();

/* GET login page. */
router.get('/', function (req, res, next) {
    res.render('login', {error: ''});
})

router.post('/', function (req, res, next) {
    var username = req.body.username,
        password = req.body.password;
    new cookie(req, res);
    sql.init({
        database: 'sonic'
    });
    sql.fetch('select * from user where username="' + username + '"', function (err, result) {
        var userSuccess = false;
        if (!err && result.length > 0) {
            result.forEach(function (o) {
                if (o.password == password) {
                    userSuccess = true;
                }
            })
        }
        if (!userSuccess) {
            res.render('login', {error: '用户名或密码错误!'})
        }
        else {
            res.cookie('username', username, {maxAge: 30 * 60 * 1000, path: '/'});
            res.redirect('/');
        }
    })

})

module.exports = router;
