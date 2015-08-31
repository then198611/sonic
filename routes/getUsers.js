var express = require('express');
var sql = require('../modules/mysql');
var router = express.Router();

/* GET userData. */
router.get('/', function(req, res, next) {
    sql.setClient({
		database : 'my'
	})	
	sql.connect();
	sql.fetch('select * from user',function(err,result){
		console.log(result);
    	res.send(result);
		sql.close();
	})
})


module.exports = router;
