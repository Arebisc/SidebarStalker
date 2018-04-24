const PythonShell = require('python-shell');
 
let options = {
  //mode: 'text',
  //pythonPath: 'path/to/python',
 // pythonOptions: ['-u'],
 // scriptPath: 'path/to/my/scripts',
  args: [
    '--model=C:\\Projects\\Politechnika\\Semestr VI\\SidebarStalker\\SidebarStalker\\src\\core\\visionDetection\\MobileNetSSD_deploy.caffemodel',
    '--prototxt=C:\\Projects\\Politechnika\\Semestr VI\\SidebarStalker\\SidebarStalker\\src\\core\\visionDetection\\MobileNetSSD_deploy.prototxt',
    '--camera_Port=8080, ',
    '--camera_IP=192.168.1.13']
};

class PeopleDetection {
  // constructor(options) {
  //   this.options = options;
  // }

  Detect() {
    let scriptFilename = 'C:\\Projects\\Politechnika\\Semestr VI\\SidebarStalker\\SidebarStalker\\src\\core\\visionDetection\\Detection.py';

    PythonShell.run(scriptFilename, options, function (err, results) {
      if (err) throw err;
      // results is an array consisting of messages collected during execution
      console.log(results[0]);
    });
  }
}

let peopleDetection = new PeopleDetection().Detect();