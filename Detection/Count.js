// spawn_python.js
var util = require("util");

var spawn = require("child_process").spawn;
var process = spawn('python',['Detection.py,--model=./MobileNetSSD_deploy.caffemodel, --prototxt=./MobileNetSSD_deploy.prototxt,--camera_Port=8080, --camera_IP=192.168.43.1']);
util.log('readingin')

process.stdout.on('data',function(chunk){

    var data = chunk.toString('utf8');// buffer to string

    util.log(data);
});