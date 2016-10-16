var EmailRecognizer = function (commander) {
  this.recognition = new webkitSpeechRecognition;
  this.recognition.lang = "en-US";
  this.recognition.continuous = true;
  this.recognition.interimResults = true;       
  this.stop_speech = false;
  this.configureCallbacks();  
  this.commander = commander;  
}

EmailRecognizer.prototype.startup = function () {
  final_transcript = '';
  this.recognition.start();
}

EmailRecognizer.prototype.shutdown = function () {
  this.stop_speech = true;
  this.recognition.stop();
}

// Need this to be private
EmailRecognizer.prototype.configureCallbacks = function () {
  emailRec = this;
  recognition = this.recognition;
  recognition.onresult = function(event) {
    var interim_transcript = '';

    for (var i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        console.log(event.results[i][0]);
        if (event.results[i][0].transcript.includes("okay stop")) {
          emailRec.shutdown();
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

  recognition.onstart = function() {
    emailRec.stop_speech = false;
  }

  recognition.onend = function() {
    if (emailRec.stop_speech === true) {
      // Edit rails params requirement, just a string requirement will do
      // ajax post to Rails for string processing and email
        // on success, reset message, inform user of command
        // else display error
      recognition.stop();
      emailRec.commander.startup();
      console.log('email voice recognition end');
      console.log('command voice recognition restarted');
    } else {
      console.log('continue message');
      recognition.start();
    }    
  }    

  recognition.onerror = function(event) {
    console.log('Speech Recognition Error: '+ event.error);
  }  
}