
var Botkit = require('botkit');
var CronJob = require('cron').CronJob;
var Queue = require('./queue');
var config = require('./config');
var _ = require('underscore');
var controller;

function init(){
  controller = Botkit.slackbot({
    debug: false
  });

  controller.spawn({
    token: config.token
  }).startRTM();

  attachListeners();
  scheduleTasks();
}

function send(msg){

}

function attachListeners(){
  controller.hears('next','direct_message,direct_mention,mention',function(bot,message) {
    bot.reply(message,'Hello yourself.');
  });
}

function scheduleTasks(){
  var queue = Queue();
  _.each(config.tasks,function(item){
    new CronJob(item.time,function(){
        taskDone(item);
      },function(){
      },
      true,
      'Asia/Karachi'
    );
  });
}

function taskDone(item){
  console.log("in item ",item);
}

module.exports.init = init;
module.exports.send = send;