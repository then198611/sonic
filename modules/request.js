var http = require('http');
var querystring = require('querystring');

var request = function (options) {
    this.init(options);
}
request.prototype = {
    init: function (options) {
        var self = this;
        options = options || {};
        self.data = options.data ? querystring.stringify(options.data) : '';
        self.callback = options.callback || null;

        self.options = {
            hostname : options.hostname || '',
            port : options.port || 80,
            path : options.path || '/',
            method : options.method || 'GET'
            /*headers : options.headers || {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': self.data.length
            }*/
        }
        if(self.options.method == 'GET' && self.data){
            self.options.path = self.options.path.indexOf('?') != -1 ? self.options.path + self.data :  self.options.path + '?' + self.data;
        }
        console.log(self.options.path);
        if(self.options.hostname) {
            self.createRequest();
        }
    },
    createRequest : function(){
        var self = this;
        self.req = http.request(self.options,function(rs){
            //console.log('STATUS:'+ rs.statusCode);
            //console.log('HEADERS:'+ JSON.stringify(rs.headers));
            rs.setEncoding('utf8');
            rs.on('data', function (chunk) {
                self.callback && self.callback(chunk);
            });

            rs.on('end', function() {
                console.log('No more data in response.')
            })
        })
        self.req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
        });
        self.options.method == 'POST' && self.req.write(self.data);
        self.req.end();
    }
}
module.exports = request;