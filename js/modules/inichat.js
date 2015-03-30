var socket = io.connect('http://10.10.34.139:3003');

// i opted out of using the node socket io functionality anywhere in the application

//initially this was to be used to keep worklist information current before the system had a chance to
//commit changes and update the worklists with sql...now that the refresh function is reliable being called on most
// route events and due to the added complexity..this functionality was pulled from the running code
// should be removed.

jQuery(document).ready(function() {

  jwt.Chat = function(socket) {
    this.socket = socket;
  };

  var chatApp = new jwt.Chat(socket);
  window['chatApp'] = chatApp;
  var user = jQuery('#xx_user_alias').html();
  //chatApp.socket.emit('nameAttempt', user );
  socket.on('message', function(message) {
    jwt.Chat.processServerResponse(message.text);
  });
  socket.on('rooms', function(rooms) {
    jQuery('#room-list').empty();
    jQuery('#room-list div').click(function() {
      chatApp.processCommand('/join ' + jQuery(this).text());
      jQuery('#send-message').focus();
    });
  });
  //setInterval(function() { socket.emit('rooms'); }, 1000);
  jwt.Chat.prototype.sendMessage = function(room, text) {
    var message = {
      room: room,
      text: text
    };
    this.socket.emit('message', message);
  };
  jwt.Chat.prototype.processCommand = function(command) {
    var words = command.split(' ');
    var command = words[0]
      .substring(1, words[0].length)
      .toLowerCase();
    var message = false;

    switch (command) {
      case 'join':
        words.shift();
        var room = words.join(' ');
        this.changeRoom(room);
        break;
      case 'nick':
        words.shift();
        var name = words.join(' ');
        this.socket.emit('nameAttempt', name);
        break;
      default:
        message = 'Unrecognized command.';
        break;
    };

    return message;
  };

  jwt.Chat.processUserInput = function(chatApp, socket) {

    var message = jQuery('#send-message').val();
    var systemMessage;

    if (message.charAt(0) == '/') {
      systemMessage = chatApp.processCommand(message);
      if (systemMessage) {
        jQuery('#messages').append(divSystemContentElement(systemMessage));
      }
    } else {

      chatApp.sendMessage(jQuery('#room').text(), message);

      jQuery('#messages').scrollTop(jQuery('#messages').prop('scrollHeight'));
    }

    jQuery('#send-message').val('');
  }
  jwt.Chat.processWorkListClick = function(obj) {
    obj.user = jQuery('#xx_user_alias').html();
    chatApp.sendMessage(jQuery('#room').text(), obj);
  }

  jwt.Chat.processServerResponse = function(obj) {
    var command = obj["command"].toLowerCase();
    var message = false;

    switch (command) {
      case 'lock':
        jQuery("tr[data-key=" + obj.wlkey + "] .ps-NAME").html(obj.wluser);
        break;
      case 'move':
        // $('#myTable tr:last').after('<tr>...</tr><tr>...</tr>');
        jQuery("tr[data-key=" + obj.wlkey + "]").remove();
      default:
        console.log('default not implemented');
        break;
    };
  };

});
