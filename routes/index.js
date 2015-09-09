var express = require('express');
var router = express.Router();
var querystring = require('querystring');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express', req: querystring.stringify(req), res: querystring.stringify(res)});
});

module.exports = router;
