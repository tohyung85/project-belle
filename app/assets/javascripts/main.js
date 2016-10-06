$(function(){
  if(!('webkitSpeechRecognition' in window)) {
    upgrade();
  } else {
    // alert('speech recognition functionality here!');
    var stop_speech = false;
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function() {}
    recognition.onresult = function(event) {
      var interim_transcript = '';

      for (var i = event.resultIndex; i < event.results.length; i++) {
        console.log(typeof event.results[i][0].transcript);
        if (event.results[i].isFinal) {
          console.log(event.results[i][0]);
          if (event.results[i][0].transcript.includes("okay stop")) {
            stop_speech = true;
            recognition.stop();
          }
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;          
        }
      }

      // final_transcript = capitalize(final_transcript);
      final_span.innerHTML = final_transcript;
      interim_span.innerHTML = interim_transcript;
    }
    recognition.onerror = function() {}
    recognition.onend = function() {      
      if (stop_speech === true) {
        console.log('message end');  
      } else {
        console.log('continue message....');
        recognition.start();  
      }      
    }
  }

  $('#start-record').click(startButton);

  function startButton(event) {
    final_transcript = '';
    recognition.lang = "en-US";
    stop_speech = false;
    recognition.start();
  }


});