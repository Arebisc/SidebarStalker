const PythonShell = require('python-shell');
const baseProjectDirectory = process.cwd();

let options = {
  //mode: 'text',
  //pythonPath: 'path/to/python',
 // pythonOptions: ['-u'],
 // scriptPath: 'path/to/my/scripts',
  args: [
    '--model=' + baseProjectDirectory + '\\src\\core\\visionDetection\\MobileNetSSD_deploy.caffemodel',
    '--prototxt=' + baseProjectDirectory + '\\src\\core\\visionDetection\\MobileNetSSD_deploy.prototxt',
    '--camera_Port=8080, ',
    '--camera_IP=192.168.43.1']
};


export function Detect() {
  return new Promise((resolve, reject) => {
    let scriptFilename = process.cwd() + '\\src\\core\\visionDetection\\Detection.py';

    PythonShell.run(scriptFilename, options, function (err, results) {
      if (err)
        reject(err);

      resolve(results[0]);
    });
  });
}
