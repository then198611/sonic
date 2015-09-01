var express = require('express');
var sql = require('../modules/mysql');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login',{error:''});
})

router.post('/', function(req, res, next) {
	var username = req.body.username,
		password = req.body.password;
	sql.init({
		database : 'my'
	})	
	sql.fetch('select * from user where username="'+username+'"',function(err,result){
		var userSuccess = false;
		if(result.length > 0){
			result.forEach(function(o){
				if(o.password == password){
					userSuccess = true;
				}
			})
		}
		!userSuccess ? res.render('login',{error : '用户名或密码错误！'}) : res.send('welcome '+ username);
	})

})

module.exports = router;
