var PythonShell = require('python-shell');
 
var options = {
  //mode: 'text',
  //pythonPath: 'path/to/python',
 // pythonOptions: ['-u'],
 // scriptPath: 'path/to/my/scripts',
  args: ['--model=./MobileNetSSD_deploy.caffemodel', '--prototxt=./MobileNetSSD_deploy.prototxt','--camera_Port=8080, ', '--camera_IP=192.168.1.13']
};
 PythonShell.run('Detection.py', options, function (err, results) {
  if (err) throw err;
  // results is an array consisting of messages collected during execution
  console.log('results: %j', results);
});