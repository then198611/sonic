var config = require('./config');
var mysql = require('mysql');


var SQL = {
	init : function(configs){
		var self = this;
		if(!self.pool){
			self.setClientPool(configs);
		}
	},
	setClientPool : function(configs){
		var self = this,
			pool = {};
		pool.host = configs.host || config.SQL.HOST;
		pool.port = configs.port || config.SQL.PORT;
		pool.user = configs.user || config.SQL.USER;
		pool.password = configs.password || config.SQL.PASSWORD;
		pool.database = configs.database || config.SQL.DATABASE;
		self.pool = mysql.createPool(pool);
	},
	close : function(){
		var self = this;
		self.client.end();
	},
	fetch : function(sql,callback){
		var self = this;
		self.query(sql,callback);
	},
	update : function(sql,callback){
		var self = this;
		self.query(sql,callback);
	},
	insert : function(sql,callback){
		var self = this;
		self.query(sql,callback);
	},
	query : function(sql,callback){
		var self = this;
		self.pool.getConnection(function(err,client){
			if(err){
				console.log('connect sql '+ err.stack);
				return;
			}
			client.query(sql,function(err,res){
				self.pool.releaseConnection(client);
				callback && callback.apply(self,arguments);
			})
		})
	},
	setResult : function(err,res){
		var self = this;
		var obj = {
			success : err ? false : true,
			data : err ? err : res
		};
		return obj;
	}
}
module.exports = SQL;
