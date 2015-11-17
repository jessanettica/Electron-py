var app = require('app');
var BrowserWindow = require('browser-window'); 
require('crash-reporter').start();
var mainWindow = null;
app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  // call python
  var subpy = require('child_process').spawn('python', [__dirname + '/hi.py']);

  // make a browser window
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // load the index.html of the app first. app needs time to start the web server, so start the static file fist 
  //and then let it detect if the web server is ready
  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  //mainWindow.loadUrl('http://localhost:5000');

  // open the devtools.
  mainWindow.openDevTools();

  // when the window closes:
  mainWindow.on('closed', function() {
    mainWindow = null;

    // kill python
    subpy.kill('SIGINT');
  });
});