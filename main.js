const {app, BrowserWindow} = require('electron')
const path = require('path');
const url = require('url');

require('dotenv').config();
require('electron-reload')(__dirname);

let win = null;

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {

  // Initialize the window to our specified dimensions
  win = new BrowserWindow({frame: false, width: 1000, height: 600, x: 50, y: 50});

  // Specify entry point
  if (process.env.PACKAGE === 'true'){
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  } else {
    win.loadURL(process.env.HOST);
    win.webContents.openDevTools();
  }

  //test 
  let show = true;
  setInterval(() => {
     show ? win.hide() : win.show();
     show = !show;
  }, 2000);

  // Remove window once app is closed
  win.on('closed', function () {

    win = null;

  });

});