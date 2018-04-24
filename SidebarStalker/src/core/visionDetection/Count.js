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
export function Detect() {
  return new Promise((resolve, reject) => {
    let scriptFilename = 'C:\\Projects\\Politechnika\\Semestr VI\\SidebarStalker\\SidebarStalker\\src\\core\\visionDetection\\Detection.py';

    PythonShell.run(scriptFilename, options, function (err, results) {
      if (err)
        reject(err);

      resolve(results[0]);
    });
  });
}
