var events = require('events');

var emitter = new events.EventEmitter();

emitter.on('someEvent',function(){
    console.log('listen1',arguments[0]);
})

emitter.on('someEvent',function(){
    console.log('listen2',arguments[0]);
})

emitter.emit('someEvent','node');