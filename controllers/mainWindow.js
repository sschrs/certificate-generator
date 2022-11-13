$(window).on("load",()=>{

    var ctx = document.getElementById("certificate-canvas").getContext("2d")
    var img = new Image;
    img.onload = ()=>{
        ctx.drawImage(img,-1,-1, 474, 335)
    }
    img.src = "../assets/img/upload.png"

    const { ipcRenderer } = require("electron")

    function fileUpload(){
        ipcRenderer.send("file")
    }

    var upload_link = document.getElementById("upload-certificate-link")
    upload_link.addEventListener("click", fileUpload)

    ipcRenderer.on("selected", function(err,data){
        upload_link.removeEventListener("click", fileUpload)
        img.src = data
        document.getElementById("certificate-canvas").addEventListener("click",function(e){
            alert(e.pageX - 515)
            alert(e.pageY - 10)
        })
    })
    
})

