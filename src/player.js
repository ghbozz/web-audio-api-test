import Track from './track';

export default class Player {

  constructor(nodes){
    this.count = 0;
    this.solo = false;
    this.status = 'stop';
    this.max = nodes.length;
    this.tracks = [];
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    nodes.forEach((node) => {
      const track = new Track(node, this.audioContext, this);
      this.tracks.push(track);
    });
    this.load();
  }

  load(){
    this.tracks.forEach((track) => {
      track.load();
    });
  }

  loading(){
    this.count += 1
    if (this.count === this.max) {
      const playBtn = document.getElementById('play')
      playBtn.removeAttribute("disabled")
    }
  }

  play(){
    if (this.status === 'stop') {
      this.tracks.forEach((track) => {
        console.log('play')
        track.play();
        this.status = 'running'
      })
    } else if (this.status === 'running') {
      this.audioContext.suspend();
      this.status = 'paused'
    } else if (this.status === 'paused') {
      this.audioContext.resume();
      this.status = 'running'
    }
  }

  isolate(toSolo){
    if (this.solo === false) {
      console.log("Mode solo inactif");
      this.tracks.forEach((track) => {
        if (track != toSolo && track.solo === false) {
          track.mute(track);
        }
      })
      this.solo = true;
      console.log("Mode solo activé")
      toSolo.solo = true;
      console.log(`${toSolo.name} en solo`)
    } else {
      if (toSolo.solo === true) {
        console.log("Mode solo actif")
        toSolo.solo = false;
        toSolo.nodeGain.gain.value = 0;
        console.log(`${toSolo.name} mute`)
        let runSolo = false;
        this.tracks.forEach((track) => {
          if (track.solo === true && track != toSolo) {
            runSolo = true;
          }
        });
        if (runSolo === false) {
          console.log("No solo")
          this.tracks.forEach((track) => {
            track.nodeGain.gain.value = 1;
          })
          this.solo = false;
          console.log("Mode solo inactivé");
        }
      } else {
        toSolo.nodeGain.gain.value = 1;
        toSolo.solo = true;
        console.log(`${toSolo.name} en concert`)
      }
    }
  }

  soloClear(){
    if (this.solo === true) {
      this.tracks.forEach((track) => {
        track.nodeGain.gain.value = 1;
        track.solo = false;
        this.solo = false;
      });
    }
  }
}

