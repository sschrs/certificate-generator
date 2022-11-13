const { BrowserWindow } = require("electron")

createWindow = (data, filepath)=>{
    const newWindow = new BrowserWindow(data)
    newWindow.loadFile(filepath)
    return newWindow
}

exports.mainWindow = ()=>{
    let window = createWindow({
        width : 1000,
        height: 600,
        title: "Certificate Generator",
        webPreferences : {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    }, "pages/mainWindow.html")
}