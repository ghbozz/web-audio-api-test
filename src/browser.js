console.log("Hello from src/browser.js");
import Track from './track';
import Player from './player';

const list = document.querySelectorAll('#track-container li')

const player = new Player(list)
const play = document.getElementById('play')
play.addEventListener('click', (event) => {
  player.play();
})

const clearBtn = document.getElementById('clear')
clearBtn.addEventListener('click', (event) => {
  player.soloClear();
});

const playheadContainer = document.querySelector('.playhead-container');
playheadContainer.addEventListener('click', (event) => {
  player.playHead(event.layerX);
})
