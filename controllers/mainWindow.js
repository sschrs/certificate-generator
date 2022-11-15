$(window).on("load",()=>{
    const { ipcRenderer } = require("electron")
    var selected_points = []
    var ctx = document.getElementById("certificate-canvas").getContext("2d")
    var certificate_canvas = document.getElementById("certificate-canvas")
    var upload_link = document.getElementById("upload-certificate-link")
    var img = new Image;

    function fileUpload(){
        ipcRenderer.send("file")
    }

    function drawRectangle(){
        x = selected_points[0].x
        y = selected_points[0].y
        width = selected_points[1].x - x
        height = selected_points[1].y - y
        ctx.beginPath()
        ctx.rect(x, y, width, height)
        ctx.stroke()
    }
    
    img.onload = ()=>{
        ctx.drawImage(img,-1,-1, 474, 335)
    }
    img.src = "../assets/img/upload.png"

    upload_link.addEventListener("click", fileUpload)
    
    ipcRenderer.on("selected", function(err,data){
        upload_link.removeEventListener("click", fileUpload)
        img.src = data
        certificate_canvas.addEventListener("click",function(e){
            if (selected_points.length < 2){
                selected_points.push({
                    "x" : e.pageX - 515,
                    "y" : e.pageY - 10
                })

                if (selected_points.length == 2){
                   drawRectangle()
                }
            }
        })
    })

    document.getElementById("reset-button").addEventListener("click", ()=>{
        ipcRenderer.send("reset")
    })
})


