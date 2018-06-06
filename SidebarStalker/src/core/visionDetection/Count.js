const PythonShell = require('python-shell');
const path = require('path');

const baseProjectDirectory = process.cwd();
const visionDetectionDirectoryPath = path.join(baseProjectDirectory, 'src', 'core', 'visionDetection');

export function Detect(settings) {
  let options = {
    args: [
      '--model=' + path.join(visionDetectionDirectoryPath, 'MobileNetSSD_deploy.caffemodel'),
      '--prototxt=' + path.join(visionDetectionDirectoryPath, 'MobileNetSSD_deploy.prototxt'),
      '--camera_Port=' + settings.cameraPort ,
      '--camera_IP=' +  settings.cameraIp
    ]
  };

  return new Promise((resolve, reject) => {
    let scriptFilename = process.cwd() +  path.join( '\\', 'src', 'core', 'visionDetection', 'Detection.py');

    PythonShell.run(scriptFilename, options, function (err, results) {
      if (err || !results[0]) {
        reject(err);
      }
      else {
        resolve(results[0]);
      }
    });
  });
}
