var socket = io();

socket.emit('CtoS User Profile', {
  username: $("#username").text().trim()
});



var app = new Vue({
    el:"#userProfile",
    
})