var express = require('express');
var sql = require('../modules/mysql');
var router = express.Router();

/* GET register page. */
router.get('/', function(req, res, next) {
    res.render('register',{error:''});
})

router.post('/', function(req, res, next) {
	var username = req.body.name,
		password = req.body.password,
		repeat_password = req.body.repeat_password,
		email = req.body.email,
		mobile = req.body.mobile;
	sql.init();
	sql.fetch('select * from user where username="'+username+'"',function(err,result1){
		var newUser = true,
			data = '';
		if(result1.length > 0){
			result1.forEach(function(o){
				if(o.username == username){
					newUser = false;
					data = '用户名已存在！';
				}
				if(o.mobile == mobile){
					newUser = false;
					data = '手机号已存在！';
				}
			})
			res.send({
				data : data,
				success : false
			})
		}
		else{
			var insert_sql = 'insert into user (username,password,email,mobile) values("'+username+'","'+password+'","'+email+'","'+mobile+'")';
			sql.insert(insert_sql,function(err,result2){
				res.send(sql.setResult(err,result2));
			})

		}
	})

})

module.exports = router;
