// Variables
var mediaPlayer;
var playPauseBtn;
var progressBar;
var muteBtn;

//Wait for DOM to be loaded before initialising media player
document.addEventListener("DOMContentLoaded", function() { initializeMediaPlayer(); }, false);

//Function to initialize Media Player
function initializeMediaPlayer(){
  mediaPlayer = document.getElementById("media-video");
  playPauseBtn = document.getElementById("play-pause-button");
  progressBar = document.getElementById("progress-bar");
  muteBtn = document.getElementById("mute-button");
  mediaPlayer.controls = false;


//Add listener for time update event so we can update the video progress bar
mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);

//Add listener for play pause event so the button can be updated
mediaPlayer.addEventListener('play', function() {
  changeButtonType(playPauseBtn, 'pause')
}, false);

mediaPlayer.addEventListener('pause', function() {
  changeButtonType(playPauseBtn, 'play')
}, false);

mediaPlayer.addEventListener('volumechange', function(i) {
  if (mediaPlayer.muted) changeButtonType (muteBtn, 'unmute');
  else changeButtonType (muteBtn, 'mute');
}, false);

mediaPlayer.addEventListener('ended', function() {this.pause(); }, false);
};
//Changes the play button to pause when play, and to play when paused
function togglePlayPause() {
  if(mediaPlayer.pause || mediaPlayer.ended) {
  changeButtonType(playPauseBtn, 'pause');
  mediaPlayer.play();
}
  else {
    changeButtonType(playPauseBtn, 'play');
    mediaPlayer.pause();
  }
};

//Stops player from playing and returns it to the start
function stopPlayer() {
  mediaPlayer.pause();
  mediaPlayer.currentTime = 0;
};

//Volume change function. Goes from 0-1 and goes up by .1 increments
function changeVolume(direction){
  if(direction === '+') mediaPlayer.volume += mediaPlayer.volume == 1 ? 0 : 0.1;
  else mediaPlayer.volume -= (mediaPlayer.volume == 0 ? 0 : 0.1);
  mediaPlayer.volume = parseFloat(mediaPlayer.volume).toFixed(1);
};

function toggleMute(){
  if(mediaPlayer.muted) {
    changeButtonType(muteBtn, 'mute')
    mediaPlayer.muted = false;
  }else {
    changeButtonType(muteBtn, 'unmute')
    mediaPlayer.muted = true;
  }
};

function replayMedia(){
  resetPlayer();
  mediaPlayer.play();
};

function updateProgressBar() {
  var percentage = Math.floor((100 /mediaPlayer.duration) * mediaPlayer.currentTime)
  progressBar.value = percentage;
};

function changeButtonType(btn, value) {
  btn.title = value;
  btn.innerHTML = value;
  btn.className = value;
};

function loadVideo() {
  for (var i = 0; i < arguments.length; i++) {
    var file = arguments[i].split('.');
    var ext = file[file.length - 1];
    if (canPlayVideo(ext)) {
      resetPlayer();
      mediaPlayer.src = arguments[i];
      mediaPlayer.load();
      break;
    }
  }
};

function canPlayVideo(ext) {
  var ableToPlay = mediaPlayer.canPlayType('video/' + ext);
  if (ableToPlay == '') return false;
  else return true;
};

function resetPlayer() {
  progressBar.value = 0;
  mediaPlayer.currentTime = 0;
  changeButtonType(playPauseBtn, 'play');
};
