var recordRTC;
navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

function successCallback(MediaStream) {
    // RecordRTC usage goes here

    var options = {
      mimeType: 'video/webm', // or video/mp4 or audio/ogg
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 128000,
      bitsPerSecond: 128000 // if this line is provided, skip above two
    };
    recordRTC = RecordRTC(MediaStream);
    recordRTC.startRecording();
}

function errorCallback(errror) {
    alert('error');
}

var mediaConstraints = { video: true, audio: true };

navigator.getUserMedia(mediaConstraints,successCallback,errorCallback);

btnStopRecording.onclick = function () {
    recordRTC.stopRecording(function (audioVideoWebMURL) {
        var video = document.querySelector('video');
        video.src = audioVideoWebMURL;

        var recordedBlob = recordRTC.getBlob();
        recordRTC.getDataURL(function(dataURL) {
          console.log(dataURL);
        });
    });
};


// navigator.getUserMedia = navigator.getUserMedia ||
//                          navigator.webkitGetUserMedia ||
//                          navigator.mozGetUserMedia;
//
// if (navigator.getUserMedia) {
//    navigator.getUserMedia({ audio: true, video: { width: 1280, height: 720 } },
//       function(stream) {
//          var video = document.querySelector('video');
//          video.src = window.URL.createObjectURL(stream);
//          video.onloadedmetadata = function(e) {
//            video.play();
//          };
//       },
//       function(err) {
//          alert("The following error occurred: " + err.name);
//       }
//    );
// } else {
//    alert("getUserMedia not supported");
// }
