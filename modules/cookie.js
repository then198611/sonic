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
        var self = this,
            name = name || '',
            value = '';
        if (!name) {
            return false;
        }
        if(self.req.cookies && self.req.cookies[name]){
            value = self.req.cookies[name];
        }
        return value;
    },
    set : function(name,value,options){
        var self = this;
        self.res.cookie(name,value,options);
    }
}
module.exports = cookie;
