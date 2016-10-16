//= require command_recognizer

$(function(){
  if(!('webkitSpeechRecognition' in window)) {
    upgrade();
  } else {
    var shutdown_ai = false;
    var commands = ['message', 'email', 'notes'];

    var recognition = new CommandRecognizer();
  }
  
  $('#start-record').click(startButton);
  $('#stop-record').click(stopButton);

  $('#test-ajax-button').click(sendEmail);

  function startButton() {
    recognition.startup();
  }

  function stopButton() {
    recognition.shutdown();
  }

  function sendEmail() {
    $.ajax({
      type: 'PUT',
      url: ui.draggable.data('update-url'),
      dataType: 'json',
      data: {email_message: {receipient: '', column_coordinate: $(this).data("column")}}
    }).done(function(data){
      console.log('done!');
    });
  }

});