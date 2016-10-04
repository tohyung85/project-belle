$(function(){
  if(!('webkitSpeechRecognition' in window)) {
    upgrade();
  } else {
    // alert('speech recognition functionality here!');
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function() {}
    recognition.onresult = function(event) {
      var interim_transcript = '';

      for (var i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;          
        }
      }

      // final_transcript = capitalize(final_transcript);
      final_span.innerHTML = final_transcript;
      interim_span.innerHTML = interim_transcript;
      console.log(final_transcript);
    }
    recognition.onerror = function() {}
    recognition.onend = function() {}
  }

  $('#start-record').click(startButton);

  function startButton(event) {
    final_transcript = '';
    recognition.lang = "en-US";
    recognition.start();
  }
});