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
        };
        var contentText = self.options.method == 'GET' ? {
            'Content-Type': 'application/json;charset=utf8'
        } : {
            'Content-Type': 'application/json;charset=utf8',
            'Content-Length': Buffer.byteLength(self.data,'utf-8')
        };
        self.options.headers = options.headers || contentText;
        
        if(self.options.method == 'GET' && self.data){
            self.options.path = self.options.path.indexOf('?') != -1 ? self.options.path + self.data :  self.options.path + '?' + self.data;
        }

        if(self.options.hostname) {
            self.createRequest();
        }
    },
    createRequest : function(){
        var self = this;
        self.req = http.request(self.options,function(rs){
            var body = '';
            //console.log('STATUS:'+ rs.statusCode);
            //console.log('HEADERS:'+ JSON.stringify(rs.headers));
            rs.setEncoding('utf8');
            rs.on('data', function (chunk) {
                body += chunk;
            });
            rs.on('end', function() {
                var data = JSON.parse(body.toString());
                self.callback && self.callback(data);
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