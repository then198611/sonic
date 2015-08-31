var express = require('express');
var sql = require('../modules/mysql');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login');
})

router.post('/', function(req, res, next) {
	var username = req.body.username,
		password = req.body.password;
	sql.setClient({
		database : 'my'
	})	
	sql.connect();
	sql.fetch('select * from user where username="'+username+'"',function(err,result){
		console.log(result);
    	res.send('login post username:'+ username +',password:'+password);
		sql.close();
	})

})

module.exports = router;
