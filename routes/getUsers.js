var express = require('express');
var sql = require('../modules/mysql');
var router = express.Router();

/* GET userData. */
router.get('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    var username = req.query['username'];
    var fetchSql = username ? 'select * from user where username="' + username + '"' : 'select * from user';
    sql.init();
    sql.fetch(fetchSql, function (err, result) {
        res.send(sql.setResult(err, result));
    })
    //res.send({a:1})
})

module.exports = router;
