/* Copyright 2013 Chris Wilson

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/


// initialize audioContext for audio stream
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();

// to be set up after audio device access is established
var audioInput = null,
    realAudioInput = null,
    inputPoint = null,
    audioRecorder = null;
var rafID = null;
var analyserContext = null;
var canvasWidth, canvasHeight;
var recIndex = 0;

// not in use ...
function saveAudio() {
    audioRecorder.exportWAV( doneEncoding );
    // could get mono instead by saying
    // audioRecorder.exportMonoWAV( doneEncoding );
}

function gotBuffers( buffers ) {
    var canvas = document.getElementById( "wavedisplay" );

    drawBuffer( canvas.width, canvas.height, canvas.getContext('2d'), buffers[0] );

    // the ONLY time gotBuffers is called is right after a new recording is completed - 
    // so here's where we should set up the download.
    audioRecorder.exportWAV( doneEncoding );
}

function doneEncoding( blob ) {
    var user_id = document.getElementById('user_data').innerHTML;
    var status = document.getElementById('user_status').innerHTML;

    // Recorder.setupDownload( blob, user_id + "_" + status + "_" + ((recIndex<10)?"0":"") + recIndex + ".wav" );
    Recorder.setupDownload( blob, user_id + "_" + status + ".wav" );
    recIndex++;

    // $('#test_buttons').show();
}

// recording controls: stop or start
// upon stop, call "gotBuffers" to prepare for saving
function toggleRecording( e ) {
    if (e.classList.contains("recording")) {
        // stop recording
        audioRecorder.stop();
        e.classList.remove("recording");
        audioRecorder.getBuffers( gotBuffers );

        var rec = document.getElementById("rec");
        rec.classList.remove("recording");

    } else {
        // start recording
        if (!audioRecorder)
            return;
        e.classList.add("recording");

        var stp = document.getElementById("stop");
        stp.classList.add("recording");

        audioRecorder.clear();
        audioRecorder.record();
    }
}

function startRecording( e ) {
  if (!audioRecorder) return;
  e.classList.add("recording");
  audioRecorder.clear();
  audioRecorder.record();

  var stp = document.getElementById("stop");
  stp.classList.add("recording");
}

function stopRecording( e ) {

  audioRecorder.stop();
  e.classList.remove("recording");
  audioRecorder.getBuffers( gotBuffers );

  var rec = document.getElementById("record");
  rec.classList.remove("recording");
}

// mono conversion - not being used
function convertToMono( input ) {
    var splitter = audioContext.createChannelSplitter(2);
    var merger = audioContext.createChannelMerger(2);

    input.connect( splitter );
    splitter.connect( merger, 0, 0 );
    splitter.connect( merger, 0, 1 );
    return merger;
}

// can disable ...
function cancelAnalyserUpdates() {
    window.cancelAnimationFrame( rafID );
    rafID = null;
}

// can disable ...
function updateAnalysers(time) {
  if (!analyserContext) {
      var canvas = document.getElementById("analyser");
      canvasWidth = canvas.width;
      canvasHeight = canvas.height;
      analyserContext = canvas.getContext('2d');
  }

  // analyzer draw code here
  {
      var SPACING = 3;
      var BAR_WIDTH = 1;
      var numBars = Math.round(canvasWidth / SPACING);
      var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);

      analyserNode.getByteFrequencyData(freqByteData); 

      analyserContext.clearRect(0, 0, canvasWidth, canvasHeight);
      analyserContext.fillStyle = '#0000ff'; // #F6D565';
      analyserContext.lineCap = 'round';
      var multiplier = analyserNode.frequencyBinCount / numBars;

      // Draw rectangle for each frequency bin.
      for (var i = 0; i < numBars; ++i) {
          var magnitude = 0;
          var offset = Math.floor( i * multiplier );
          // gotta sum/average the block, or we miss narrow-bandwidth spikes
          for (var j = 0; j< multiplier; j++)
              magnitude += freqByteData[offset + j];
          magnitude = magnitude / multiplier;
          var magnitude2 = freqByteData[i * multiplier];
          analyserContext.fillStyle = "hsl( " + Math.round((i*360)/numBars) + ", 100%, 50%)";
          analyserContext.fillRect(i * SPACING, canvasHeight, BAR_WIDTH, -magnitude);
      }
  }
  
  rafID = window.requestAnimationFrame( updateAnalysers );
}

// mono on/off - not used
function toggleMono() {
  if (audioInput != realAudioInput) {
      audioInput.disconnect();
      realAudioInput.disconnect();
      audioInput = realAudioInput;
  } else {
      realAudioInput.disconnect();
      audioInput = convertToMono( realAudioInput );
  }

  audioInput.connect(inputPoint);
}

// callback from successful obtaining the audio device
function gotStream(stream) {
  inputPoint = audioContext.createGain();

  // Create an AudioNode from the stream.
  realAudioInput = audioContext.createMediaStreamSource(stream);
  audioInput = realAudioInput;
  audioInput.connect(inputPoint);

  // *** disable mono *** //
  // audioInput = convertToMono( input );

  analyserNode = audioContext.createAnalyser();
  analyserNode.fftSize = 2048;
  inputPoint.connect( analyserNode );

  // set up recording
  audioRecorder = new Recorder( inputPoint );

  zeroGain = audioContext.createGain();
  zeroGain.gain.value = 0.0;
  inputPoint.connect( zeroGain );
  zeroGain.connect( audioContext.destination );
  updateAnalysers();
}

// obtain access to the audio device
function initAudio() {

  if (!navigator.getUserMedia)
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  if (!navigator.cancelAnimationFrame)
      navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
  if (!navigator.requestAnimationFrame)
      navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

  navigator.getUserMedia({audio:true}, gotStream, function(e) {
      alert('Error getting audio');
      console.log(e);
  });

  // video_handle = document.getElementById("video_interfere"); 


}

// call initAudio after the page is loaded
// window.addEventListener('load', initAudio );
