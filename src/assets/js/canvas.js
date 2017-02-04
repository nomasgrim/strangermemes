
var canvas, ctx, bMouseIsDown = false, iLastX, iLastY,
    $save, $imgs,
    $convert, $imgW, $imgH,
    $sel,$drawPic,$copy;

var basePath = 'assets/images/hero/';
window.blkblnkt = {};

function init () {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  $save = document.getElementById('save');
  $copy = document.getElementById('strangerCopy');
  $drawPic = document.getElementById('drawPic');
  $sel = 'jpeg';
  $imgs = document.getElementById('imgs');
  // $imgW = 960;
  // $imgH = 1134;
  $imgW = 650;
  $imgH = 450;
  bind();
  // draw();
}

window.blkblnkt.createCanvas = function(copy, img) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  imageObj = new Image();
  // imageObj.src = basePath + 'strangerthings.jpg';
  imageObj.src = basePath + img;
  imageObj.onload = function() {
    ctx.drawImage(imageObj, 0, 0);
    loadFont(copy);
    loadBars(copy);
  }
}

function bind () {
  if($drawPic) {
    $drawPic.onclick = function(e){
      var content = $copy.value;
      createCanvas(content);
    }    
  }
  
  $save.onclick = function (e) {
    var type = $sel,
        w = $imgW,
        h = $imgH;
    Canvas2Image.saveAsImage(canvas, w, h, type);
  }
  
}

function draw () {
  createCanvas('EDIT CONTENT');
}

function loadFont(copy) {
  // neonLightEffect(copy);
  ctx.font = "80px StrangerFont-Condensed";
  ctx.fillStyle = "#ff0000";
  ctx.textAlign="center";
  ctx.shadowColor = "red";
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0; // integer
  ctx.globalCompositeOperation = 'source-over'; 
  ctx.fillText(copy, canvas.width/2, 100);
}

function loadBars(copy){
  var width = ctx.measureText(copy).width;
  var centerX = (canvas.width / 2) - (width/2);
  ctx.rect(centerX, 10, width, 5);
  ctx.fillStyle = '#000';
  ctx.shadowColor = '#ff0000';
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 10;
  ctx.fill();
}

var createCanvas = window.blkblnkt.createCanvas;

onload = init;