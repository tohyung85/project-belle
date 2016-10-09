$(function(){
  if(!('webkitSpeechRecognition' in window)) {
    upgrade();
  } else {
    var shutdown_ai = false;
    var commands = ['message', 'email', 'notes'];
    var grammar = '#JSGF V1.0; grammar commands; public <commands> = '+ commands.join('|') +' ;';
    var speechRecognitionList = new webkitSpeechGrammarList();
    speechRecognitionList.addFromString(grammar,1);

    var recognition = new webkitSpeechRecognition();
    configureCommandRecognizer();

    var stop_speech = false;
    var emailVoiceRecognition = new webkitSpeechRecognition;
    configureEmailRecognizer();
  }

  $('#start-record').click(startButton);
  $('#stop-record').click(stopButton);

  function startButton() {
    final_transcript = '';
    recognition.lang = "en-US";
    recognition.start();
  }

  function stopButton() {
    shutdown_ai = true;
    recognition.stop();
  }

  function recordAudioInput () {
    stopButton();    
    emailVoiceRecognition.start();    
  }

  function configureCommandRecognizer () {
    recognition.continuous = true;
    recognition.interimResults = true;    
    recognition.grammars = speechRecognitionList;

    recognition.onstart = function() {
      shutdown_ai = false;
    }
    recognition.onresult = function(event) {
      var last = event.results.length - 1;
      var command = event.results[last][0].transcript;
      var executed = '';
      console.log(command);
      switch (command) {
        case ' email':
        case 'email':
          executed = 'email';
          console.log('email executed');
          recordAudioInput();
          break;
        case ' message':
        case 'message':
          executed = 'message';
          console.log('message executed');
          break;
        case ' notes':
        case 'notes':
          executed = 'notes'
          console.log('notes executed');
          break;
        default:
          executed = 'invalid command';
          console.log('no commands!');
      }      
    }
    recognition.onerror = function() {}
    recognition.onend = function() {      
      if (shutdown_ai === true) {
        console.log('shutting down...');  
      } else {
        console.log('still awake...');
        recognition.start();  
      }      
    }
  }

  function configureEmailRecognizer () {
    emailVoiceRecognition.continuous = true;
    emailVoiceRecognition.interimResults = true;        

    emailVoiceRecognition.onresult = function(event) {
      var interim_transcript = '';

      for (var i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          console.log(event.results[i][0]);
          if (event.results[i][0].transcript.includes("okay stop")) {
            stop_speech = true;
            emailVoiceRecognition.stop();
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

    emailVoiceRecognition.onstart = function() {
      stop_speech = false;
    }

    emailVoiceRecognition.onend = function() {
      if (stop_speech === true) {
        emailVoiceRecognition.stop();
        recognition.start();
        console.log('email voice recognition end');
        console.log('command voice recognition restarted');
      } else {
        console.log('continue message');
        emailVoiceRecognition.start();
      }    
    }    

    emailVoiceRecognition.onerror = function(event) {
      console.log('Speech Recognition Error: '+ event.error);
    }
  }

});