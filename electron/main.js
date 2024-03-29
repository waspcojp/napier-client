const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");

const api = require('./api');
const WIDTH = 1200;
//const WIDTH = 1600;
const HEIGHT = 900;

let mainWindow;
const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: WIDTH,
        height: HEIGHT,
        minWidth: WIDTH,
        minHeight: HEIGHT,
        //maxWidth: WIDTH,
        //maxHeight: HEIGHT,
        resizable: true,
        useContentSize: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });
    mainWindow.loadFile("front/html/index.html");

    if  ( WIDTH > 1200 )    {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    })
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
};


const dialogOpen = (ev, args) => {
    return new Promise((resolve, reject) => {
        dialog.showOpenDialog(null, {
            properties: ['openDirectory'],
            title: 'Document root',
            defaultPath: '.'
        }).then((result) => {
            resolve(result);
        }).catch((e) => {
            reject(e);
        });
    });
}

let passwordWindow;
const passwordOpen = (ev, args) => {
    //console.log('passwordOpen');
    passwordWindow = new BrowserWindow({
        parent: mainWindow,
        width: WIDTH / 2,
        height: HEIGHT / 2,
        center: true,
        resizable: true,
        modal: true,
        show: false
    });
    passwordWindow.loadFile("front/html/password.html");
    passwordWindow.once('ready-to-show', () => {
        console.log('show');
        passwordWindow.show();
    });
    passwordWindow.on('close', () => {

    });
    passwordWindow.on('closed', () => {
        passwordWindow = null;
    });
}

const passwordClose = (ev, args) => {
    passwordWindow.close();
}

app.whenReady().then(() => {
    createWindow();

    ipcMain.handle('user:login', api.login);
    ipcMain.handle('user:logout', api.logout);
    ipcMain.handle('user:signup', api.signup);
    ipcMain.handle('user:password', api.password);
    ipcMain.handle('user:get', api.getUser);
    ipcMain.handle('user:put', api.putUser)
    ipcMain.handle('env:set', api.setConf);
    ipcMain.handle('env:get', api.getConf);
    ipcMain.handle('password:get', api.getPassword);
    ipcMain.handle('password:put', api.putPassword);
    ipcMain.handle('profiles', api.getProfiles);
    ipcMain.handle('profile:update', api.updateProfile);
    ipcMain.handle('profile:delete', api.deleteProfile);
    ipcMain.handle('proxy:start', api.startProxy);
    ipcMain.handle('proxy:stop', api.stopProxy);
    ipcMain.handle('proxy:check', api.checkProxy);
    ipcMain.handle('dialog:open', dialogOpen);
    ipcMain.handle('password:open', passwordOpen);
    ipcMain.handle('password:close', passwordClose);
    ipcMain.handle('web-server:start', api.startWebServer);
    ipcMain.handle('web-server:stop', api.stopWebServer);
    ipcMain.handle('web-server:check', api.checkWebServer);

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});