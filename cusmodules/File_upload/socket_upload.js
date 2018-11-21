var AWS = use('aws-sdk');
var SocketIOFile = use('socket.io-file');
var ffmpeg = use('ffmpeg');

function uploadVideo(socket){

    var uploader = new SocketIOFile(socket, {
        // uploadDir: {			// multiple directories
        // 	music: 'data/music',
        // 	document: 'data/document'
        // },
        uploadDir: 'public/uploadtest', // simple directory
        accepts: ['image/jpeg', 'image/png', 'video/mp4', 'image/gif'], // chrome and some of browsers checking mp3 as 'audio/mp3', not 'audio/mpeg'
        maxFileSize: 20971520, // 20 MB. 20*1024*1024 default is undefined(no limit)
        chunkSize: 10240, // default is 10240(1KB)
        transmissionDelay: 0, // delay of each transmission, higher value saves more cpu resources, lower upload speed. default is 0(no delay)
        overwrite: true // overwrite file if exists, default is true.
      });
      uploader.on('start', (fileInfo) => {
        console.log('Start uploading');
        console.log(fileInfo);
      });
      uploader.on('stream', (fileInfo) => {
        // console.log(`${fileInfo.wrote} / ${fileInfo.size} byte(s)`);
      });
      uploader.on('complete', (fileInfo) => {
        console.log('Upload Complete.');
        console.log(fileInfo);
        try {
          var process = new ffmpeg('public/uploadtest/'+fileInfo.name);
          process.then(function (video) {
            video
            .setVideoFrameRate(25)
            .setVideoSize('75%',true,true)
            .save('public/videoconvert/'+fileInfo.name ,function(error,file){
              if(!error){
                console.log('video file:' + file); 
                io.sockets.connected[socket.id].emit('StoC video convert ok');
              }else{
                console.log(error);
                
              }
            });
            // Video metadata
            console.log(video.metadata);
            console.log("=====================");
            
            // FFmpeg configuration
            console.log(video.info_configuration);
          }, function (err) {
            console.log('Error: ' + err);
          });
        } catch (e) {
          console.log(e.code);
          console.log(e.msg);
        }
      });
      uploader.on('error', (err) => {
        // console.log('Error!', err);
      });
      uploader.on('abort', (fileInfo) => {
        // console.log('Aborted: ', fileInfo);
      });
}

module.exports = {
    uploadVideo:uploadVideo
}

