
var XYModel;
var canvas;
var slider1, slider2, slider3;
var T,J,B;
var button;
var toneDrone;
function setup() {
  colorMode(HSB);
  canvas = createCanvas(windowWidth*0.5,windowWidth*0.5);
  noStroke();
  XYModel = new XYModel(windowWidth*0.5*(1/64), 64, canvas);
  XYModel.randomInit();

  toneDrone = new ToneDrone();
  toneDrone.connectComponents();
  slider1 = createSlider(0.001,1.0,0.01, 0.001);
  slider2 = createSlider(-1.0,1.0,0.0, 0.01);
  slider3 = createSlider(-1.0,1.0,0.0, 0.01);

  button = createButton('click me');
  button.position(19, 19);
  button.mousePressed(play);

    var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);

  frameRate(30);

  var loop = new Tone.Loop(function(time){
  	//triggered every eighth note.
    play();
  }, "8n").start(0);
  Tone.Transport.start();
}

function draw() {
  fill(0, 0.4);
rect(0,0, width, height);
  XYModel.draw();

  XYModel.T = slider1.value();
 XYModel.J = slider2.value();
   XYModel.B = slider3.value();
   toneDrone.synth.harmonicity.value = map(slider1.value(), 0.001, 1.0, 1.0, 10.0);
   toneDrone.synth.modulationIndex.value = map(slider1.value(), 0.001, 1.0, 1.0, 100.0);


}

function update_temp(){
  let gTval = parseFloat(document.getElementById('temp').value);
  XYModel.T = gTval;


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

function play(){
  toneDrone.play();
}
