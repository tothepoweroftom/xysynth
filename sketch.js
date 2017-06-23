var XYModel;
var canvas;
var slider1, slider2, slider3;
var T, J, B;
var button;
var toneDrone;
var number = 100;
var running = false;
var context;

function setup() {
    // Disable scrolling.
    // document.ontouchmove = function(e) {
    //     e.preventDefault();
    // }

    Tone.Transport.start();
    Tone.Master.volume.value = -Infinity;
    // Tone.Master.volume.rampTo(-1, 0.5);

    slider1 = createSlider(0.001, 1.0, 0.1, 0.001);
    slider2 = createSlider(-1.0, 1.0, 0.0, 0.01);
    slider3 = createSlider(-1.0, 1.0, 0.0, 0.01);
    slider4 = createSlider(0.0, 100.0, 0.0, 1.0);
    button = createButton('Start');
    button.style("color: white; background-color: black; font-family: 'Roboto', sans-serif; width: 70px; border: solid #ffffff 1px;");


    console.log(windowWidth);
    var devicePixelRatio = window.devicePixelRatio || 1;
    console.log(devicePixelRatio);
    colorMode(HSB);


    if (windowWidth <= 960 && windowWidth !== 768) {
        // button.touchStarted(toggle);
        button.mouseClicked(toggle);


        let spacing = windowHeight / 20;
        let margin = windowHeight / 20;
        canvas = createCanvas(windowWidth * 0.85, windowWidth * 0.85);
        XYModel = new XYModel(windowWidth * 0.85 * (2 / number), number, canvas);
        slider1.position(windowWidth / 2 - 100, windowHeight - 4 * spacing - margin);
        slider2.position(windowWidth / 2 - 100, windowHeight - 3 * spacing - margin);
        slider3.position(windowWidth / 2 - 100, windowHeight - 2 * spacing - margin);
        slider4.position(windowWidth / 2 - 100, windowHeight - spacing - margin);
        button.position(windowWidth / 2 - 35, windowHeight - 5 * spacing - margin)

        var x = (windowWidth - width) / 2;
        var y = (windowHeight - height) / 4;
        canvas.position(x, y);



    } else if (windowWidth === 768) {
        // button.touchStarted(toggle);
        button.mouseClicked(toggle);


        // console.log("Hit");
        let spacing = windowHeight / 20;
        let margin = windowHeight / 20;
        canvas = createCanvas(windowWidth * 0.85, windowWidth * 0.85);
        XYModel = new XYModel(windowWidth * 0.85 * (1 / number), number, canvas);
        slider1.position(windowWidth / 4 - slider1.width * 0.5, windowHeight - 2 * spacing - margin);
        slider2.position(windowWidth / 4 - slider1.width * 0.5, windowHeight - 1 * spacing - margin);
        slider3.position(3 * windowWidth / 4 - slider1.width * 0.5, windowHeight - 2 * spacing - margin);
        slider4.position(3 * windowWidth / 4 - slider1.width * 0.5, windowHeight - 1 * spacing - margin);
        button.position(windowWidth / 2 - 35, windowHeight - 5 * spacing - margin)

        var x = (windowWidth - width) / 2;
        var y = (windowHeight - height) / 3;
        canvas.position(x, y);

    } else if (windowWidth >= 1300) {
        button.mouseClicked(toggle);

        let spacing = 40;
        let margin = 100;
        canvas = createCanvas(windowWidth * 0.4, windowWidth * 0.4);
        XYModel = new XYModel(windowWidth * 0.4 * (1 / number), number, canvas);
        slider1.position(slider1.width * 0.5, windowHeight / 2 - spacing);
        slider2.position(slider1.width * 0.5, windowHeight / 2);
        slider3.position(slider1.width * 0.5, windowHeight / 2 + spacing);
        slider4.position(slider1.width * 0.5, windowHeight / 2 + 2 * spacing);
        button.position(slider1.width * 0.5, windowHeight / 2 + 3 * spacing)

        var x = (windowWidth - width) / 2;
        var y = (windowHeight - height) / 2;
        canvas.position(x, y);

    } else {
        button.mouseClicked(toggle);
        console.log("Clled");
        let spacing = 40;
        let margin = 100
        canvas = createCanvas(windowWidth * 0.5, windowWidth * 0.5);
        XYModel = new XYModel(windowWidth * 0.5 * (1 / number), number, canvas);
        slider1.position(slider1.width * 0.5, windowHeight / 2 - spacing);
        slider2.position(slider1.width * 0.5, windowHeight / 2);
        slider3.position(slider1.width * 0.5, windowHeight / 2 + spacing);
        slider4.position(slider1.width * 0.5, windowHeight / 2 + 2 * spacing);
        button.position(slider1.width * 0.5, windowHeight / 2 + 3 * spacing)

        var x = (windowWidth - width) / 2;
        var y = (windowHeight - height) / 2;
        canvas.position(x, y);
    }
    // noStroke();
    noFill();
    XYModel.randomInit();

    toneDrone = new ToneDrone();
    toneDrone.connectComponents();


    var div = createDiv('link').size(200, 50);
    div.position(windowWidth / 2 - 50, windowHeight - 25);
    div.style("font-family: 'Open Sans Condensed', sans-serif; color: white");
    div.html('<a href="http://tothepoweroftom.com">tothepoweroftom.com</a>');


    // frameRate(30);

    var loop = new Tone.Loop(function(time) {
        //triggered every eighth note.
        play();
    }, "2n").start("+0.50");
}

function draw() {

    if (running) {

        fill(0, 0.4);
        rect(0, 0, width, height);
        XYModel.draw();

        XYModel.T = slider1.value();
        XYModel.J = slider2.value();
        XYModel.B = slider3.value();

        adjustDrone(slider1.value(), slider2.value(), slider3.value());
        changeColor(slider4.value());
    }

}

function toggle() {
    if (running) {
        //Pause the system
        button.html("Start");
        Tone.Master.volume.rampTo(-Infinity, 0.5);

        running = false;
        console.log(running);
    } else if (!running) {
        //Start the system
        StartAudioContext(Tone.context, "#start");
        Tone.Master.volume.rampTo(-1, 0.5);


        button.html("Pause");
        running = true;
        console.log(running);


    }
}

function adjustDrone(val1, val2, val3) {
    toneDrone.synth.harmonicity.value = map(val2, -1.0, 1.0, 1.0, 10.0);
    toneDrone.synth.modulationIndex.value = map(val3, -1.0, 1.0, 1.0, 50.0);

    toneDrone.dist.distortion = map(val1, 0.001, 1.0, 0.10, 0.80);
    toneDrone.vibrato.depth.value = map(val2, -1.0, 1.0, 0.0, 1.0);

    toneDrone.vibrato.frequency.value = map(val3, -1.0, 1.0, 1.0, 500.0);
}

function changeColor(val) {
    XYModel.sat = val;
}

function update_temp() {
    let gTval = parseFloat(document.getElementById('temp').value);
    XYModel.T = gTval;


}

function update_field() {
    let gBval = parseFloat(document.getElementById('field').value);
    XYModel.B = gBval;
    console.log(gBval);

}

function update_K() {
    gJval = parseFloat(document.getElementById('correlation').value);
    XYModel.J = gJval;
    console.log(gJval);

}

function play() {
    toneDrone.play();
}
