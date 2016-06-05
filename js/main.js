// Variables. Mostly buttons s
var playpause = document.getElementById('playpause');
var stop = document.getElementById('stop');
var mute = document.getElementById('mute');
var volinc = document.getElementById('volinc');
var voldec = document.getElementById('voldec');
var progress = document.getElementById('progress');
var progressBar = document.getElementById('progress-bar');
var $fullScreen = $(document.getElementById('fs'));
var videoContainer = document.getElementsByClassName('wrapper');
var $video = document.getElementById('media-video');
var videoControls = document.getElementById('video-controls');
var seekBar = document.getElementById('progress');
console.log(seekBar);
var currentTime = document.getElementById('current-time');
var durationTime = document.getElementById('duration-time');
//Seek Bar

$(seekBar).slider({
  range: true
});
// Event listener for the seek bar
seekBar.addEventListener("change", function() {
  // Calculate the new time
  var time = $video.duration * (seekBar.value / 100);

  // Update the video time
  $video.currentTime = time;
});

// Update the seek bar as the video plays
$video.addEventListener("timeupdate", function() {
  // Calculate the slider value
  var value = (100 / $video.duration) * $video.currentTime;

  // Update the slider value
  seekBar.value = value;
});

// Pause the video when the slider handle is being dragged
seekBar.addEventListener("mousedown", function() {
  $video.pause();
});

// Play the video when the slider handle is dropped
seekBar.addEventListener("mouseup", function() {
  $video.play();
});

//Function to alter the volume of the video
var alterVolume = function(dir) {
   var currentVolume = Math.floor($video.volume * 10) / 10;
      if (dir === '+') {
      if (currentVolume < 1) $video.volume += 0.1;
        }
      else if (dir === '-') {
      if (currentVolume > 0) $video.volume -= 0.1;
        }
};


//Goes through the full screen browser functions to match it with the right one

// Hide the default controls
$video.controls = false;

// Display the user defined video controls
videoControls.style.display = 'block';

//Sets up the player if the browser supports the video
var supportsVideo = !!document.createElement('video').canPlayType;
if (supportsVideo) {

//The play pause controls for the video
  playpause.addEventListener('click', function(e) {
     if ($video.paused || $video.ended) $video.play();
     else $video.pause();
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
     $video.muted = !$video.muted;
  });

//Pauses video and resets to start
  stop.addEventListener('click', function(e) {
     $video.pause();
     $video.currentTime = 0;
     progress.value = 0;
  });

  $fullScreen.click(function () {
      if ($video.requestFullscreen) {
          $video.requestFullscreen();
      } else if ($video.mozRequestFullScreen) {
          $video.mozRequestFullScreen(); // Firefox
      } else if ($video.webkitRequestFullscreen) {
          $video.webkitRequestFullscreen(); // Chrome and Safari
      }
  });
}
//progress bar code
$video.addEventListener('loadedmetadata', function() {
   progress.setAttribute('max', $video.duration);
});

$video.addEventListener('timeupdate', function() {
   progress.value = $video.currentTime;
   progressBar.style.width = Math.floor(($video.currentTime / $video.duration) * 100) + '%';
});

$video.addEventListener('timeupdate', function() {
   if (!progress.getAttribute('max')) progress.setAttribute('max', $video.duration);
   progress.value = $video.currentTime;
   progressBar.style.width = Math.floor(($video.currentTime / $video.duration) * 100) + '%';
});


			// Listen for fullscreen change events (from other controls, e.g. right clicking on the video itself)
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

      $('.wrapper').mouseenter(function () {
            $('#video-controls').fadeIn(500);
        });


        $('.wrapper').mouseleave(function () {
              $('#video-controls').fadeOut(500);
          });

        function startHighlight(h) {
         $('span[data-start-time="' + h + '"]').effect('highlight', {color:'orange'});
        }

timeupdate.addEventListener()
    //Timeline for highlights
        function timeline(currentTime) {
          if (currentTime > 0.1 && currentTime < 4.130) {
             startHighlight(0.1);
          } else if (currentTime > 4.13 && currentTime < 7.535) {
             startHighlight(4.13);
          } else if (currentTime > 7.535 && currentTime < 11.27) {
             startHighlight(7.535);
          } else if (currentTime > 11.27 && currentTime < 13.96) {
            startHighlight(11.27);
          } else if (currentTime > 13.96 && currentTime < 17.94) {
            startHighlight(13.96);
          } else if (currentTime > 17.94 && currentTime < 22.37) {
            startHighlight(17.94);
          } else if (currentTime > 22.37 && currentTime < 26.88) {
            startHighlight(22.37);
          } else if (currentTime > 26.88 && currentTime < 30.92) {
            startHighlight(26.88);
          } else if (currentTime > 32.1 && currentTime < 34.73) {
            startHighlight(32.1);
          } else if (currentTime > 34.73 && currentTime < 39.43) {
            startHighlight(34.73 );
          } else if (currentTime > 39.43 && currentTime < 41.19) {
            startHighlight(39.43);
          } else if (currentTime > 42.35 && currentTime < 46.3) {
            startHighlight(42.35);
          } else if (currentTime > 46.3 && currentTime < 49.27) {
            startHighlight(46.3);
          } else if (currentTime > 49.27 && currentTime < 53.76) {
            startHighlight(49.27);
          } else if (currentTime > 53.76 && currentTime < 57.78 ) {
            startHighlight(53.76);
          } else if (currentTime > 57.78) {
            startHighlight(57.78);
          }
        }
  timeline();
