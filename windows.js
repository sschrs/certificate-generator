const { BrowserWindow, ipcMain, dialog } = require("electron")

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

    ipcMain.on("file", async(event,arg)=>{
        await dialog.showOpenDialog(window, {
            properties: ['openDirectory','openFile']
        }).then((result)=>{
            path = result.filePaths[0]
            window.webContents.send("selected", path)
        })         
    })

}