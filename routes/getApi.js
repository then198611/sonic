var express = require('express');
var http = require('http');
var request = require('../modules/request');
var router = express.Router();

/* GET api page. */
router.get('/', function (req, res) {
    new request({
        hostname : 'api2.hichao.com',
        path : '/comments',
        data : {
            id : 102,
            type : 'theme',
            access_token : 'yk0rcg-R38tiElCbOnxBU_x3vzTl4-9Q_UGYXb84idE'
        },
        callback : function(data){
            // res.render('getApi', {
            //     data : JSON.parse(data)
            // });
            res.render('getApi', {
                data : data
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
