var server = require('./module/start');
var router = require('./module/router');

server.start(router.route);