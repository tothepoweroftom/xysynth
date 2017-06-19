
var XYModel;
var canvas;
var slider1, slider2, slider3;
var T,J,B;
function setup() {
  colorMode(HSB);
  canvas = createCanvas(windowWidth*0.5,windowWidth*0.5);
  noStroke();
  XYModel = new XYModel(windowWidth*0.5*(1/32), 32, canvas);
  XYModel.randomInit();
  slider1 = createSlider(0.001,1.0,0.01, 0.001);
  slider2 = createSlider(-1.0,1.0,0.0, 0.01);
  slider3 = createSlider(-1.0,1.0,0.0, 0.01);

  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);

  frameRate(24);

}

function draw() {
  fill(0, 0.2);
rect(0,0, width, height);
  XYModel.draw();
 
  XYModel.T = slider1.value();
 XYModel.J = slider2.value();
   XYModel.B = slider3.value();



}

function update_temp(){
  let gTval = parseFloat(document.getElementById('temp').value);
  XYModel.T = gTval;
  console.log(gTval);

}
function update_field(){
  let gBval = parseFloat(document.getElementById('field').value);
  XYModel.B = gBval;
  console.log(gBval);

}
function update_K(){
  gJval = parseFloat(document.getElementById('correlation').value);
  XYModel.J = gJval;
  console.log(gJval);

}
