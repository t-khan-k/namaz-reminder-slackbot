
var CronJob = require('cron').CronJob;
var instance;

function Queue(tasks){
  this.q = [] || tasks;
}

var task = Queue.prototype;

task.enqueue = function(item){
    new CronJob(item.time,function(){
      this.dequeue();
      this._done(item);
    }.bind(this),function(){
    },
    true,
    'Asia/Karachi'
  );
  this.q.push(item);
  return this;
};

task.dequeue = function(){
  return this.q.shift();
};

task.peekNext = function(){
  return this.peekAt(0);
};

task.peekAt = function(i){
  return this.q[i] || null;
};

task.onTaskDone = function(fn){
  this._done = fn;
};

function getInstance(arr){
  console.log("passed ",arr);
  if(!instance)
    instance = new Queue(arr);
  return instance;
}

module.exports = getInstance;