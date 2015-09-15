/**
 * set get remove cookie
 */

var cookie = function (req, res) {
    this.init(req, res);
}
cookie.prototype = {
    init: function (req, res) {
        var self = this;
        self.req = req;
        self.res = res;
    },
    get: function (name) {
        var self = this;

    }
}
module.exports = cookie;
