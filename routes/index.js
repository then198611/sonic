var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var cookie = require('../modules/cookie');

/* GET home page. */
router.get('/', function (req, res, next) {
    var diyCookie = new cookie(req, res);
    var name = diyCookie.get('username') || '';
    res.render('index', {
        title: 'Express', req: querystring.stringify(req), res: querystring.stringify(res),
        name : name
    });
});

module.exports = router;
