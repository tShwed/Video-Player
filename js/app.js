

// Variables. Mostly buttons s
var playpause = document.getElementById('playpause');
var stop = document.getElementById('stop');
var mute = document.getElementById('mute');
var volinc = document.getElementById('volinc');
var voldec = document.getElementById('voldec');
var progress = document.getElementById('progress');
var progressBar = document.getElementById('progress-bar');
var fullscreen = document.getElementById('fs');
var videoContainer = document.getElementById('wrapper');
var video = document.getElementById('media-video');
var videoControls = document.getElementById('video-controls');

//Function to alter the volume of the video
var alterVolume = function(dir) {
   var currentVolume = Math.floor(video.volume * 10) / 10;
   if (dir === '+') {
      if (currentVolume < 1) video.volume += 0.1;
   }
   else if (dir === '-') {
      if (currentVolume > 0) video.volume -= 0.1;

};


// Hide the default controls
video.controls = false;

// Display the user defined video controls
videoControls.style.display = 'block';

//Sets up the player if the browser supports the video
var supportsVideo = !!document.createElement('video').canPlayType;
if (supportsVideo) {

//The play pause controls for the video
  playpause.addEventListener('click', function(e) {
     if (video.paused || video.ended) video.play();
     else video.pause();
  });

//Increase and Decrease in volume by .1 increments. Largest is 1
  volinc.addEventListener('click', function(e) {
     alterVolume('+');
  });
  voldec.addEventListener('click', function(e) {
     alterVolume('-');
  });

//Mutes video
  mute.addEventListener('click', function(e) {
     video.muted = !video.muted;
  });

//Pauses video and resets to start
  stop.addEventListener('click', function(e) {
     video.pause();
     video.currentTime = 0;
     progress.value = 0;
  });

  fs.addEventListener('click', function(e) {
       handleFullscreen();
  });
};

video.addEventListener('loadedmetadata', function() {
   progress.setAttribute('max', video.duration);
});

video.addEventListener('timeupdate', function() {
   progress.value = video.currentTime;
   progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
});

video.addEventListener('timeupdate', function() {
   if (!progress.getAttribute('max')) progress.setAttribute('max', video.duration);
   progress.value = video.currentTime;
   progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
});

//Full Screen section
//Tests to see if the browser can handle full screen
var fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);

//Handles the visibility of fullscreen
if (!fullScreenEnabled) {
   fullscreen.style.display = 'none';
};
//this is what makes full screen work. If the browser is capable of handling full screen, the function runs tests to see if it can run it


//Goes through the full screen browser functions to match it with the right one
var isFullScreen = function() {
   return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
};

var handleFullscreen = function() {
   if (isFullScreen()) {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
      setFullscreenData(false);
   }
   else {
      if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
      else if (videoContainer.mozRequestFullScreen) videoContainer.mozRequestFullScreen();
      else if (videoContainer.webkitRequestFullScreen) videoContainer.webkitRequestFullScreen();
      else if (videoContainer.msRequestFullscreen) videoContainer.msRequestFullscreen();
      setFullscreenData(true);
   }
};

var setFullscreenData = function(state) {
   videoContainer.setAttribute('data-fullscreen', !!state);
}
document.addEventListener('fullscreenchange', function(e) {
   setFullscreenData(!!(document.fullScreen || document.fullscreenElement));
});
document.addEventListener('webkitfullscreenchange', function() {
   setFullscreenData(!!document.webkitIsFullScreen);
});
document.addEventListener('mozfullscreenchange', function() {
   setFullscreenData(!!document.mozFullScreen);
});
document.addEventListener('msfullscreenchange', function() {
   setFullscreenData(!!document.msFullscreenElement);
});
