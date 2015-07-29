var http = require('http');
var url = require('url');

function start(route){
    function onRequest(request,response){
        var pathname = url.parse(request.url).pathname;
        console.log("request for " + pathname + ';');
        response.writeHead(200,{'Content-type' : "text/plain"});
        route(pathname);
        response.write('hello nodejs');
        response.end();
    }
    http.createServer(onRequest).listen(8888);
    console.log('server 8888 has started...');
}
exports.start = start;