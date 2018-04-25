const PythonShell = require('python-shell');
const path = require('path');

const baseProjectDirectory = process.cwd();
const visionDetectionDirectoryPath = path.join(baseProjectDirectory, 'src', 'core', 'visionDetection');
const port = '8080';
const ip = '192.168.1.13'

let options = {
  //mode: 'text',
  //pythonPath: 'path/to/python',
 // pythonOptions: ['-u'],
 // scriptPath: 'path/to/my/scripts',
  args: [
    '--model=' + path.join(visionDetectionDirectoryPath, 'MobileNetSSD_deploy.caffemodel'),
    '--prototxt=' + path.join(visionDetectionDirectoryPath, 'MobileNetSSD_deploy.prototxt'),
    '--camera_Port=' + port + ', ',
    '--camera_IP=' +  ip]
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
