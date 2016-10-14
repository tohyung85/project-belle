var SpeechCommandRouter = function() { }

SpeechCommandRouter.prototype.route = function(event) {
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