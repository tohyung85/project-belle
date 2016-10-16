//= require email_recognizer

var CommandRecognizer = function () { 
  this.recognition = new webkitSpeechRecognition;
  this.recognition.lang = "en-US";
  this.recognition.continuous = true;
  this.recognition.interimResults = false;
  this.shutdown_ai = false;
  this.configureCallbacks();
  this.emailRecognizer = new EmailRecognizer(this);
};

CommandRecognizer.prototype.shutdown = function () {
  this.shutdown_ai = true;
  console.log(this.shutdown_ai);
  this.recognition.stop();
}

CommandRecognizer.prototype.startup = function () {
  this.recognition.start();
}

// Need this to be private
CommandRecognizer.prototype.configureCallbacks = function () {
  commandRec = this;
  recognition = this.recognition;
  
  recognition.onstart = function() {
    commandRec.shutdown_ai = false;
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
        commandRec.shutdown();
        commandRec.emailRecognizer.startup();
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
    if (commandRec.shutdown_ai === true) {
      console.log('shutting down...');  
    } else {
      console.log('still awake...');
      recognition.start();  
    }      
  } 
}