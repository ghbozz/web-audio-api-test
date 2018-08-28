console.log("Hello from src/browser.js");
import Track from './track';
import Player from './player';
const files = ['audiofiles/audio_1.mp3',
'audiofiles/audio_2.mp3',
'audiofiles/audio_4.mp3',
'audiofiles/audio_5.mp3',
'audiofiles/audio_6.mp3',
'audiofiles/audio_7.mp3',
'audiofiles/audio_8.mp3',
'audiofiles/audio_9.mp3',
'audiofiles/audio_10.mp3',
'audiofiles/audio_11.mp3',
'audiofiles/audio_12.mp3',
'audiofiles/audio_13.mp3',
'audiofiles/audio_14.mp3',
'audiofiles/audio_15.mp3',
'audiofiles/audio_16.mp3',
'audiofiles/audio_17.mp3',
'audiofiles/audio_18.mp3']

const list = document.querySelectorAll('#track-container li')

const player = new Player(list)
const play = document.getElementById('play')
play.addEventListener('click', (event) => {
  player.play();
})

