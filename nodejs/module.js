var name;

exports.setName = function(n){
    name = n;
}

exports.sayHello = function(){
    console.log('Hello ' + name);
}