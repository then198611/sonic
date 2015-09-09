/*
 * set mysql pool
 * */

var config = require('./config');
var mysql = require('mysql');


var SQL = {
    settings: {
        poolArray: []
    },
    init: function (configs) {
        var self = this;
        if (!configs.database) {
            console.log('没有数据库名，无法建立连接池！');
            return;
        }
        self.configs = configs || {};
        self.getCurrentPool();
        if (!self.pool) {
            self.setClientPool();
        }
    },
    getCurrentPool: function () {
        var self = this,
            grepArray = [];
        self.settings.poolArray.forEach(function (o) {
            if (o.database == self.configs.database) {
                grepArray.push(o);
                self.pool = o.pool;
                return false;
            }
        })

        grepArray.length == 0 && self.settings.poolArray.push({
            database: self.configs.database,
            pool: ''
        })

    },
    setClientPool: function () {
        var self = this,
            pool = {};
        pool.host = self.configs.host || config.SQL.HOST;
        pool.port = self.configs.port || config.SQL.PORT;
        pool.user = self.configs.user || config.SQL.USER;
        pool.password = self.configs.password || config.SQL.PASSWORD;
        pool.database = self.configs.database || config.SQL.DATABASE;
        self.pool = mysql.createPool(pool);
        self.settings.poolArray.forEach(function (o) {
            if (o.database == self.configs.database) {
                o.pool = self.pool;
                return false;
            }
        })
    },
    close: function () {
        var self = this;
        self.pool.end();
    },
    fetch: function (sql, callback) {
        var self = this;
        self.query(sql, callback);
    },
    update: function (sql, callback) {
        var self = this;
        self.query(sql, callback);
    },
    insert: function (sql, callback) {
        var self = this;
        self.query(sql, callback);
    },
    query: function (sql, callback) {
        var self = this;
        self.pool.getConnection(function (err, client) {
            if (err) {
                console.log('connect sql ' + err.stack);
                return;
            }
            client.query(sql, function (err, res) {
                callback && callback.apply(self, arguments);
                //self.pool.releaseConnection(client);
                client.release();
            })
        })
    },
    setResult: function (err, res) {
        var self = this;
        var obj = {
            success: err ? false : true,
            data: err ? err : res
        };
        return obj;
    }
}
module.exports = SQL;
