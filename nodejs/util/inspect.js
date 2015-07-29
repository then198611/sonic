var util = require('util');

function Person(){
    this.name = 'node';
    this.showName = function(){
        return this.name;
    }
}

var obj = new Person();

console.log(util.inspect(obj));
console.log(util.inspect(obj,true));