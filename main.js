const { app, Menu} = require("electron")
const { mainWindow } = require("./windows")

app.whenReady().then(()=>{
    const menu = Menu.buildFromTemplate([]);
    Menu.setApplicationMenu(menu);

    window = mainWindow()
    window.on("close",()=>{
        app.quit()
    })
  
    
})