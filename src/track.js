export default class Track {

  constructor(node, audioContext, player){
    this.player = player;
    this.solo = false;
    this.node = node;
    this.url = node.dataset.url;
    this.name = node.dataset.name;
    this.audioContext = audioContext;
    this.nodeGain = audioContext.createGain();
    this.source;
    this.status = 'stop'
  }

  load(){
    fetch(this.url)
    .then((response) => {
      return response.arrayBuffer();
    })
    .then((buffer) => {
      this.audioContext.decodeAudioData(buffer, (decoded) => {
        this.source = this.audioContext.createBufferSource();
        this.source.buffer = decoded;
        this.source.connect(this.nodeGain);
        this.nodeGain.connect(this.audioContext.destination);
        this.player.loading();
        this.display();
      })
    })
  }

  display(){
    const muteBtn = this.node.querySelector('.mute')
    muteBtn.addEventListener('click', (event) => {
      this.mute(muteBtn);
    })
    const soloBtn = this.node.querySelector('.solo')
    soloBtn.addEventListener('click', (event) => {
      this.isolate();
    })
  }

  play(){
    this.source.start(0);
  }


  mute(element){
    if (this.nodeGain.gain.value === 1) {
      this.nodeGain.gain.value = 0
      element.innerHTML = 'unmute'
    } else {
      this.nodeGain.gain.value = 1
      element.innerHTML = 'mute'
    };
  }

  isolate(){
    this.player.isolate(this);
  }
}


