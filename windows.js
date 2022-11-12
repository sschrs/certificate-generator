const { BrowserWindow } = require("electron")

createWindow = (data, filepath)=>{
    const newWindow = new BrowserWindow(data)
    newWindow.loadFile(filepath)
    return newWindow
}
