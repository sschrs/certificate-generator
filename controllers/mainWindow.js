$(window).on("load",()=>{
    const { ipcRenderer } = require("electron")
    let selected_points = []
    let ctx = document.getElementById("certificate-canvas").getContext("2d")
    let certificate_canvas = document.getElementById("certificate-canvas")
    let upload_link = document.getElementById("upload-certificate-link")
    let img = new Image;
    let colorPicker = document.getElementById("color-picker")
    let fontsize = document.getElementById("fontsize")
    let fontfamily = document.getElementById("fontfamily")
    var selected_dest = "./";
    let name_list = []
    
    function fileUpload(){
        ipcRenderer.send("file")
    }

    function drawRectangle(){
        let x = selected_points[0].x
        let y = selected_points[0].y
        let width = selected_points[1].x - x
        let height = selected_points[1].y - y
        ctx.beginPath()
        ctx.rect(x, y, width, height)
        ctx.stroke()
    }

    function drawText(text, font, font_size, color){
        let x1 = selected_points[0].x
        let y1 = selected_points[0].y
        let x2 = selected_points[1].x
        let y2 = selected_points[1].y
        ctx.font = font_size + "px " + font
        ctx.textAlign = "center"
        ctx.fillStyle = color
        ctx.fillText(text, x2-((x2-x1)/2), y2-((y2-y1)/2))
    }

    const updateList = ()=>{
        let table = document.getElementById("name-table");
        table.innerHTML = "";
        let tableBody = document.createElement("tbody");

        for (let i=0;i<name_list.length;i++){
            let row = document.createElement("tr");
            let number = document.createElement("td");
            number.innerText = (i+1).toString();

            let name = document.createElement("td");
            name.innerText = name_list[i];

            row.appendChild(number);
            row.appendChild(name);

            tableBody.appendChild(row);
        }
        table.appendChild(tableBody);
    }

    updateList();
    
    const addName = ()=>{
        let nameInput = document.getElementById("name-input");
        let name = nameInput.value;
        name_list.push(name);
        nameInput.value = ""
        updateList();
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

    $("#add-button").on("click", addName)

    document.getElementById("reset-button").addEventListener("click", ()=>{
        ipcRenderer.send("reset")
    })
    
})


