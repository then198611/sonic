var express = require('express');
var sql = require('../modules/mysql');
var router = express.Router();

/* GET userData. */
router.get('/', function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");//跨域支持,一般最好不要开，开的话 开指定域名
    var username = req.query['username'];
    var fetchSql = username ? 'select * from user where username="' + username + '"' : 'select * from user';
    sql.init({
        database : 'sonic'
    });
    sql.fetch(fetchSql, function (err, result) {
        res.send(sql.setResult(err, result));
    })
    //res.send({a:1})
})

module.exports = router;
