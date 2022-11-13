const { app } = require("electron")
const { mainWindow } = require("./windows")

app.whenReady().then(()=>{
    window = mainWindow()
    window.on("close",()=>{
        app.quit()
    })
})