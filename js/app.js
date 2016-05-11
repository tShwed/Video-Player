//All variables required
var mediaPlayer;
var play-pause-button;
var volumeChange;
var mute;
var timeChange;
var progressBar;
var fullScreen;

//Add Listener to start the media player on page loas
document.addEventListener("DOMContentLoaded", function() { initializeMediaPlayer(); }, false);

//Gets all elements required to create media player
function initializeMediaPlayer() {
  mediaPlayer = document.getElementById('media-video');
  play-pause-button = document.getElementById('play-pause-button');
  mute = document.getElementById('mute-button');
  timeChange = document.getElementById('time-current', 'time-duration');
  progressBar = document.getElementById('progress-bar');
  fullScreen = document.getElementById('Fullscreen');

  //Add listener for time update event so we can update the video progress bar
  mediaPlayer.addEventListener('timeupdate', updateProgressBar(););

  //Add listener for play pause event so the button can be updated
  mediaPlayer.addEventListener('play', function() {
    changeButtonType(playPauseBtn, 'pause')
  }
);

  mediaPlayer.addEventListener('pause', function() {
    changeButtonType(playPauseBtn, 'play')
  }
);

  mediaPlayer.addEventListener('volumechange', function(i) {
    if (mediaPlayer.muted) changeButtonType (muteBtn, 'unmute');
    else changeButtonType (muteBtn, 'mute');
  }
);

  mediaPlayer.addEventListener('ended', function() {this.pause(); });

  mediaPlayer.addEventListener('Fullscreen', function() {
    
  })
};
