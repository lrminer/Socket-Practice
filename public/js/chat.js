// make connection
// const socket = io.connect('http://localhost:2020');
const socket = io.connect('https://dry-sea-58969.herokuapp.com/');

// query DOM

// let message = document.getElementById('message');
// let handle = document.getElementById('handle');
// let sendButton = document.getElementById('send');
// let output = document.getElementById('output');
let message = $('#message');
let handle = $('#handle');
let sendButton = $('#send');
let output = $('#output');
let feedback = $('#feedback');
let player = $('#player');
let playerX = $('#player').css('right');
let playerY = $('#player').css('bottom');

// emit events
// chat event
sendButton.click(function () {
    socket.emit('chat', {
        message: message.val(),
        handle: handle.val()
    });

    message.val("");
});

socket.on('chat', function (data) {
    feedback.empty();

    output.append($('<p>')
        .append($('<strong>').text(data.handle)));
    output.append($('<p>').text(data.message));
});


// typing event
message.keypress(function () {
    socket.emit('typing', {
        handle: handle.val()
    });
});

socket.on('typing', function (data) {
    // console.log(data);
    // data.handle 
    feedback.html($('<p><em>').text(data.handle + " is typing..."));
});

// move event (requires event parameter to determine the key that is pressed)
$(document).keyup(function (e) {
    let direction;
    // let property;
    console.log(e.key);


    switch (e.key) {
        case 'ArrowLeft':
            direction = "left";
            // property = "left";
            break;
        case 'ArrowUp':
            direction = "up";
            // property = "top";
            break;
        case 'ArrowRight':
            direction = "right";
            // property = "right";
            break;
        case 'ArrowDown':
            direction = "down";
            // property = "bottom";
            break;
    }
    socket.emit('move', {
        direction: direction
    });
});

socket.on('move', function (data) {
    console.log(data);
    switch (data.direction) {
        case 'left':
            playerX = parseInt(playerX.slice(0, -2)) + 10;
            playerX += "px";
            player.css('right', playerX);
            break;
        case 'up':
            playerY = parseInt(playerY.slice(0, -2)) + 10;
            playerY += "px";
            player.css('bottom', playerY);
            break;
        case 'right':
            playerX = parseInt(playerX.slice(0, -2)) + -10;
            playerX += "px";
            player.css('right', playerX);
            break;
        case 'down':
            playerY = parseInt(playerY.slice(0, -2)) + -10;
            playerY += "px";
            player.css('bottom', playerY);
            break;
    }
});