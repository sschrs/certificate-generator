$(window).on("load",()=>{
    const { ipcRenderer } = require("electron")
    var selected_points = []
    var ctx = document.getElementById("certificate-canvas").getContext("2d")
    var certificate_canvas = document.getElementById("certificate-canvas")
    var upload_link = document.getElementById("upload-certificate-link")
    var img = new Image;
    var colorPicker = document.getElementById("color-picker")
    var fontsize = document.getElementById("fontsize")
    var fontfamily = document.getElementById("fontfamily")
    var selected_dest = "./";
    var name_list = []
    
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

    function drawText(text, font, font_size, color){
        x1 = selected_points[0].x
        y1 = selected_points[0].y
        x2 = selected_points[1].x
        y2 = selected_points[1].y
        ctx.font = font_size + "px " + font
        ctx.textAlign = "center"
        ctx.fillStyle = color
        ctx.fillText(text, x2-((x2-x1)/2), y2-((y2-y1)/2))
    }

    const updateList = ()=>{
        var table = document.getElementById("name-table");
        var tableBody = document.createElement("tbody");

        for (let i=0;i<name_list.length;i++){
            var row = document.createElement("tr");
            var number = document.createElement("td");
            number.innerText = (i+1).toString();

            var name = document.createElement("td");
            name.innerText = name_list[i];

            row.appendChild(number);
            row.appendChild(name);

            tableBody.appendChild(row);
        }
        table.appendChild(tableBody);
    }

    updateList()
    
    
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
                   drawText("John Doe", fontfamily.value, fontsize.value, colorPicker.value)
                }
            }
        })
    })

    ipcRenderer.on("selected-dest", function(err,data){
        selected_dest = data;
    })

    $(".text-style").on("change", ()=>{
        ctx.drawImage(img,-1,-1, 474, 335)
        drawRectangle()
        drawText("John Doe", fontfamily.value, fontsize.value, colorPicker.value)
    })

    $("#generate-button").on("click",()=>{
        generate()
    })

    $("#dest").on("click", ()=>{
        alert()
        ipcRenderer.send("dest")
    })

    document.getElementById("reset-button").addEventListener("click", ()=>{
        ipcRenderer.send("reset")
    })
    
})


