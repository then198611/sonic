var express = require('express');
var http = require('http');
var request = require('../modules/request');
var router = express.Router();

/* GET api page. */
router.get('/', function (req, res) {
    /*var request = http.get('http://admin.shop.hichao.com/api/kuaidi/api?express_sn=229266370172',function(rs){
        rs.setEncoding('utf8');
        rs.on('data',function(data){
            request.end();
            console.log(data);
        })

    });*/
    new request({
        hostname : 'v1.admin.shop.hichao.com',
        path : '/api/kuaidi/api',
        data : {
            express_sn : 100212272285,
            order_id : 308
        },
        callback : function(data){
            res.render('getApi', {
                data : JSON.parse(data)
            });
        }
    });

    /*request.on('end',function(){
        console.log('No more data in response.');
    })
    request.on('error',function(rs){
        console.log('problem with request: ' + rs.message);
    })*/


});

module.exports = router;
