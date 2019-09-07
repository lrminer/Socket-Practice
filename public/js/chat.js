// make connection
const socket = io.connect('http://localhost:2020');

// query DOM

// let message = document.getElementById('message');
// let handle = document.getElementById('handle');
// let sendButton = document.getElementById('send');
// let output = document.getElementById('output');
let message = $('#message');
let handle = $('#handle');
let sendButton = $('#send');
let output = $('#output');
let feedback = $('#feedback')

// emit events
sendButton.click(function () {
    socket.emit('chat', {
        message: message.val(),
        handle: handle.val()
    })
    message.val("");
})

socket.on('chat', function (data) {
    feedback.empty();

    output.append($('<p>')
        .append($('<strong>').text(data.handle)));
    output.append($('<p>').text(data.message));
});

message.keypress(function () {
    socket.emit('typing', {
        handle: handle.val()
    })
})

socket.on('typing', function (data) {
    // console.log(data);
    // data.handle 
    feedback.html($('<p><em>').text(data.handle + " is typing..."))
})