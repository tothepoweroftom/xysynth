function XYModel(cellsize, gridNumber, canvas) {
    this.ready = false;
    this.lastDrawTime = 0;
    this.fps = 0;
    this.t = 0;
    //Grid sizes and drawing
    this.ni = gridNumber*0.1;
    this.nj = gridNumber*0.1;
    this.cellsize = cellsize || 1;
    // this.grid = grid;
    // this.grid.width = cellsize * this.ni*4;
    // this.grid.height = cellsize * this.nj*4;
    this.canvas = canvas;

    //Array of phases
    this.phases = new Array();
    for (var i = 0; i < this.ni; i++) {
        this.phases[i] = new Array();
    }

    //Temperature Variable
    this.T = 0.9;

    //Magnetic Field
    this.B = 0.0;

    //Coupling Constant Thing
    this.J = 1.00;

    this.pause = false;
    strokeWeight(0.5);

    this.sat = 0;
    this.bright = 100;


}

// Initialize the states to random
XYModel.prototype.randomInit = function() {
    for (var i = 0; i < this.ni; i++) {
        for (var j = 0; j < this.nj; j++) {
            this.phases[i][j] = Math.random() * 2 * Math.PI
        }
    }
}

XYModel.prototype.setT = function(_T) {
    this.T = _T;
}

XYModel.prototype.draw = function() {
    // console.log(this.t);


    // setTimeout(this.draw, 1);
    this.t++;
    var drawi = new Array();
    var drawj = new Array();
    for (var c = 0; c < 360; c++) {
        drawi[c] = new Array();
        drawj[c] = new Array();
    }
    var newphases = new Array();
    for (var i = 0; i < this.ni; i++) {
        newphases[i] = new Array();
        for (var j = 0; j < this.nj; j++) {
            var f = 0;
            f += (i > 0 ? Math.sin(this.phases[i][j] - this.phases[i - 1][j]) : 0);
            f += (i < this.ni - 1 ? Math.sin(this.phases[i][j] - this.phases[i + 1][j]) : 0);
            f += (j > 0 ? Math.sin(this.phases[i][j] - this.phases[i][j - 1]) : 0);
            f += (j < this.nj - 1 ? Math.sin(this.phases[i][j] - this.phases[i][j + 1]) : 0);


            f *= this.J;
            f += this.T * (2 * Math.random() - 1);
            f += this.B * Math.sin(this.phases[i][j]);
            newphases[i][j] = this.phases[i][j] - f;

            var c = rad2deg(newphases[i][j]);
            // console.log("c======" + c);
            drawi[c].push(i);
            drawj[c].push(j);
        }
    }

    var tempphases = this.phases;
    this.phases = newphases;
    newphases = tempphases;

    //Do the actual drawing ================
    for (var c = 0; c < 360; c++) {
        for (var n = 0; n < drawi[c].length; n++) {
            // if (n == 0) fill(c, 100, 80);
            if (n == 0){
              stroke(c, this.sat, this.bright);
              // fill(c, this.sat, this.bright);
            }


            var x = 10*this.cellsize*sin(radians(c));
            var y = 10*this.cellsize*cos(radians(c));

            line(drawi[c][n]*this.cellsize, drawj[c][n]*this.cellsize, drawi[c][n]*this.cellsize + x, drawj[c][n]*this.cellsize +y);
            // this.context.ellipse(drawi[c][n] * this.cellsize, drawj[c][n] * this.cellsize, this.cellsize, this.cellsize, c, c+10, true);
        }
    }
}


function rad2deg(angrad) {
    var angdeg = (angrad / (2 * Math.PI) * 360) % 360;
    if (angdeg < 0) angdeg += 360;
    return Math.floor(angdeg);
}

function deg2rad(deg) {
    var angrad = deg * 2 * Math.PI / 360 % 2 * Math.PI;
    return angrad;
}

function mod(a, b) {
    var notMod = a % b;
    if (notMod < 0) notMod += b;
    return notMod;
}
