var socket = io();

socket.emit('CtoS User Profile',{
    username:$("#username").text().trim()
});

socket.on('CtoS User Project File',function(data){
    console.log(data.file);
    
})

