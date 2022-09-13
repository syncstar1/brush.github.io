const saveBtn = document.getElementById('save')
const textInput = document.getElementById('text')
const eraserBtn = document.getElementById('eraser-btn')
const modeBtn = document.getElementById("mode-btn")
const destroyBtn = document.getElementById("destroy-btn")
const colorOptions = Array.from(document.getElementsByClassName("color-option"))
const color = document.getElementById("color")
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector('canvas')

const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
   
ctx.lineWidth = lineWidth.value;
ctx.lineCap = 'round';

let isPainting = false;
let isFilling = false;
function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY)
        ctx.stroke();
        return;
    }
    ctx.beginPath()
    ctx.moveTo(event.offsetX, event.offsetY)
}

function onMouseDown(){
isPainting = true;
}

function onMouseUp(){
    isPainting = false;
}

function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
}
 
function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event){
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle= colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue
}

function onModeClick(){
if(isFilling){
    isFilling = false;
    modeBtn.innerText = "Fill"
}else{
    isFilling  = true;
    modeBtn.innerText ="Draw"
}
}

function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0,0, CANVAS_WIDTH,CANVAS_HEIGHT)
    }
}

function onDestroyClick(){
    ctx.fillStyle='white'
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);    
}

function onEraserCLick(){
    ctx.strokeStyle ="white";
    isFilling = false;
    modeBtn.innerText ="Fill"
}

function onDoubleClick(event){
  
    const text = textInput.value;
    if(text !==''){

        ctx.save();
        ctx.lineWidth = 1;
        ctx.font="68px serif"
        ctx.fillText(text,event.offsetX, event.offsetY) 
        ctx.restore()
    }
}

function onSaveClick(){
    const url = canvas.toDataURL()
    const a = document.createElement('a')
    a.href=url
    a.download ="myDrawing.png"
    a.click()
}

canvas.addEventListener('dblclick', onDoubleClick)
canvas.addEventListener("mousemove",onMove)
canvas.addEventListener("mousedown", onMouseDown)
canvas.addEventListener("mouseup", onMouseUp)
canvas.addEventListener('mouseleave', onMouseUp)
canvas.addEventListener('click', onCanvasClick)
lineWidth.addEventListener('change', onLineWidthChange)
color.addEventListener('change', onColorChange)
 

colorOptions.forEach(color=>color.addEventListener("click", onColorClick))

modeBtn.addEventListener("click", onModeClick)

destroyBtn.addEventListener('click',onDestroyClick)

eraserBtn.addEventListener('click', onEraserCLick) 
 
saveBtn.addEventListener("click", onSaveClick)