var config = require('./config');
var mysql = require('mysql');


var SQL = {
	setClient : function(configs){
		var self = this,
			client = {};
		client.host = configs.host || config.SQL.HOST;
		client.port = configs.port || config.SQL.PORT;
		client.user = configs.user || config.SQL.USER;
		client.password = configs.password || config.SQL.PASSWORD;
		self.database = configs.database || config.SQL.DATABASE;
		self.client = mysql.createConnection(client);
	},
	connect : function(){
		var self = this;
		self.client.connect();
		self.client.query('use '+self.database + ';');
	},
	close : function(){
		var self = this;
		self.client.end();
	},
	fetch : function(sql,callback){
		var self = this;
		self.client.query(sql,function(){
			callback && callback.apply(this,arguments);
		})
	},
	update : function(sql,callback){
		var self = this;
		self.client.query(sql,function(){
			callback && callback.apply(this,arguments);
		})
	},
	insert : function(sql,callback){
		var self = this;
		self.client.query(sql,function(){
			callback && callback.apply(this,arguments);
		})
	}

}
module.exports = SQL;
