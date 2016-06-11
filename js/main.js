// Variables. Mostly buttons s
var playpause = document.getElementById('playpause');
var pause = document.getElementById('pause');
var mute = document.getElementById('mute');
var volinc = document.getElementById('volinc');
var voldec = document.getElementById('voldec');
var progress = document.getElementById('progress');
var progressBar = document.getElementById('progress-bar');
var $fullScreen = $(document.getElementById('fs'));
var videoContainer = document.getElementsByClassName('wrapper');
var $video = document.getElementById('media-video');
var videoControls = document.getElementById('video-controls');
var currentTime = document.getElementById('current-time');
var durationTime = 0.98;
var setFullscreenData = function(state) {
   videoContainer.setAttribute('data-fullscreen', !!state);
};

//Seek Bar

$(progress).slider({
  range: true
});
// Event listener for the seek bar
progress.addEventListener("change", function() {
  // Calculate the new time
  var time = $video.duration * (progress.value / 100);

  // Update the video time
  $video.currentTime = time;
});

// Update the seek bar as the video plays
$video.addEventListener("timeupdate", function() {
  // Calculate the slider value
  var value = (100 / $video.duration) * $video.currentTime;

  timeline(value);

  // Update the slider value
  progress.value = value;
});

//styles playpause button to pause state
function pauseIcon() {
	playpause.style.width = "18px";
	playpause.style.height = "24px";
	playpause.style.background = "url('./icons/pause-icon.png')";
}

//styles playpause button to play state
function playIcon() {
	playpause.style.width = "22px";
	playpause.style.height = "26px";
	playpause.style.background = "url('./icons/play-icon.png')";
}
// Pause the video when the slider handle is being dragged
progress.addEventListener("mousedown", function() {
  $video.pause();
  $video.currentTime = ($('.ui-slider-range.ui-widget-header.ui-corner-all').width() / 100) * $video.duration;
});

// Play the video when the slider handle is dropped
progress.addEventListener("mouseup", function() {
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


// Hide the default controls
$video.controls = false;

// Display the user defined video controls
videoControls.style.display = 'block';

//Sets up the player if the browser supports the video
var supportsVideo = !!document.createElement('video').canPlayType;
if (supportsVideo) {

//The play pause controls for the video
  playpause.addEventListener('click', function(e) {
     if ($video.paused || $video.ended) {
     $video.play();
   } else
     $video.pause();
 });
 //Changes playpause icon
  playpause.addEventListener('click', function(e) {
    if ($video.paused){
      playIcon();
    } else {
      pauseIcon();
    }
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

//full screen
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


//Shows current time of video
            $video.addEventListener('timeupdate', function() {
              	var playedMinutes = parseInt($video.currentTime / 60, 10);
              	var playedSeconds = parseInt($video.currentTime % 60);
              	//tests to add leading 0 to short times
              	if (playedMinutes < 10) {
              		playedMinutes = "0" + playedMinutes;
              	}
              	if (playedSeconds < 10) {
              		playedSeconds = "0" + playedSeconds;
              	}
              	currentTime.innerHTML = playedMinutes + ":" + playedSeconds;
              });

//Hide/Show controls
      $('figure').mouseenter(function () {
            $('#video-controls').fadeIn(500);
        });


      $('.wrapper').mouseleave(function () {
            $('#video-controls').fadeOut(500);
        });

//Caption highlight
        function startHighlight(h) {
         $('span[data-start-time="' + h + '"]').css("background-color", "orange");
       }

       function stopHighlight(h) {
         $('span[data-start-time="' + h + '"]').css("background-color", "grey");
       }

    function timeline(currentTime) {
      var time = currentTime / 1.739;
      if (time > 0.1 && time < 4.13) {
           startHighlight(0.1);
        } else if (time > 4.13 && time < 7.535) {
           stopHighlight(0.1);
           startHighlight(4.13);
        } else if (time > 7.535 && time < 11.27) {
          stopHighlight(4.13);
          startHighlight(7.535);
        } else if (time > 11.27 && time < 13.96) {
          stopHighlight(7.535);
          startHighlight(11.27);
        } else if (time > 13.96 && time < 17.94) {
          stopHighlight(11.27);
          startHighlight(13.96);
        } else if (time > 17.94 && time < 22.37) {
          stopHighlight(13.96);
          startHighlight(17.94);
        } else if (time > 22.37 && time < 26.88) {
          stopHighlight(17.94);
          startHighlight(22.37);
        } else if (time > 26.88 && time < 30.92) {
          stopHighlight(22.37);
          startHighlight(26.88);
        } else if (time > 32.1 && time < 34.73) {
          stopHighlight(26.88);
          startHighlight(32.1);
        } else if (time > 34.73 && time < 39.43) {
          stopHighlight(32.1);
          startHighlight(34.73);
        } else if (time > 39.43 && time < 41.19) {
          stopHighlight(34.73);
          startHighlight(39.43);
        } else if (time > 42.35 && time < 46.3) {
          stopHighlight(39.43);
          startHighlight(42.35);
        } else if (time > 46.3 && time < 49.27) {
          stopHighlight(42.35);
          startHighlight(46.3);
        } else if (time > 49.27 && time < 53.76) {
          stopHighlight(46.3);
          startHighlight(49.27);
        } else if (time > 53.76 && time < 57.78 ) {
          stopHighlight(49.27);
          startHighlight(53.76);
        } else if (time > 57.78) {
          stopHighlight(53.76);
          startHighlight(57.78);
        }
    }
