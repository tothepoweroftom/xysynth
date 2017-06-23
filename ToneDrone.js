function ToneDrone() {
    this.synth = new Tone.FMSynth({

        "harmonicity": 1.11,
        "modulationIndex": 5,
        "detune": 0,
        "oscillator": {
            "type": "sine"
        },
        "modulation": {
            "type": "sine"
        },
        "modulationEnvelope": {
            "attack": 0.05,
            "decay": 0,
            "sustain": 1.0,
            "release": 0.2,
        }
    });
    this.noise = new Tone.Noise("pink");
    this.limiter = new Tone.Limiter(-6);
    this.eq = new Tone.EQ3(-10, -20, -1);
    this.dist = new Tone.Distortion(0.9);
    this.vibrato = new Tone.Vibrato(1, 0.1);
    this.pingPong = new Tone.PingPongDelay("4n", 0.7);
    this.reverb = new Tone.Freeverb(0.1, 500);
    this.vol = new Tone.Volume(0).toMaster();
}

ToneDrone.prototype.connectComponents = function() {
    this.synth.chain(this.eq, this.vibrato, this.pingPong, this.reverb, this.dist, this.limiter, this.vol);
}

ToneDrone.prototype.play = function() {
    this.synth.triggerAttack("C1");

}
