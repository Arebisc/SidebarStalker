import { app, BrowserWindow, ipcMain } from 'electron';
import { Detect } from './../core/visionDetection/Count';
import { SidebarStalkerUtils } from './../../src/renderer/helpers/sidebarStalkerUtils';
import * as child_process from 'child_process';
import path from 'path';

const baseProjectDirectory = process.cwd();

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('detect-people-request', (event, arg) => {
  console.log(arg);
  Detect(arg)
  .then((detectedPeople) => {
    event.sender.send('detect-people-response', detectedPeople);
  })
  .catch(err => {
    console.log('catched: ' + err);
    event.sender.send('detect-people-error', err);
  });
});

ipcMain.on('read-appsettings-request', (event, args) => {
  SidebarStalkerUtils
    .readAppsettingsFile()
    .then(response => {
      event.sender.send('read-appsettings-response', response);
    })
    .catch(err => {
      console.log(err);
    });
});

ipcMain.on('save-appsettings-request', (event, args) => {
  SidebarStalkerUtils
    .saveAppsettingsFile(args)
    .then(response => {
      event.sender.send('save-appsettings-response', args);
    })
    .catch(err => {
      console.log(err);
    });
});
  
let pingingScriptPath = path.join(baseProjectDirectory, 'src', 'core', 'cardReader', 'ping.js');

let childPingingScript = child_process.spawn('node', [ pingingScriptPath ]);
childPingingScript.stdout.on('data', (data) => {
  mainWindow.webContents.send('pingCommunicate', data);
});