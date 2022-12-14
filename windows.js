const { BrowserWindow, ipcMain, dialog } = require("electron")
const fs = require('fs')
const readline = require('readline')

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

    ipcMain.on("dest", async(event,arg)=>{
        await dialog.showOpenDialog(window, {
            properties: ['openDirectory']
        }).then((result)=>{
            path = result.filePaths[0]
            window.webContents.send("selected-dest", path)
        })         
    })

    ipcMain.on("import", async(event, arg)=>{
        await dialog.showOpenDialog(window, {
            properties: ["openFile"],
            filters: [{name: "Text File", extensions: ["txt"]}]
        }).then((result)=>{
            file_path = result.filePaths[0]
            list = [];
            var rd = readline.createInterface({
                input: fs.createReadStream(file_path),
                output: process.stdout,
                console: false
            })
            rd.on('line', line=>{
                window.webContents.send("new-name",line);
            })
        })
    })

    ipcMain.on("to-image", (err,data)=>{
        var base64Data = data.base64URL.replace(/^data:image\/png;base64,/, "");
        require("fs").writeFile(data.path + "/"+data.name+".png", base64Data, 'base64', function(err) {
            console.log(err);
        });
    })



    ipcMain.on("reset", ()=>{
        window.reload()
    })

}