var SocketIOFile = use('socket.io-file');
var ffmpeg = use('ffmpeg');
var fs = use('fs');
var upS3 = require('./upload_s3');
var path = use('path');

var date = new Date();
var YY = date.getFullYear();
var MM = date.getMonth()+1;
var DD = date.getDate();
var mm = date.getMinutes();
var SS = date.getSeconds();
function uploadImg(io, socket, username) {

  var uploader = new SocketIOFile(socket, {

      uploadDir: 'public/UserProfile/' + username + '/Upload', // simple directory
      accepts: ['image/jpeg', 'image/png', 'image/gif'], // chrome and some of browsers checking mp3 as 'audio/mp3', not 'audio/mpeg'
      maxFileSize: 20971520, // 20 MB. 20*1024*1024 default is undefined(no limit)
      chunkSize: 10240, // default is 10240(1KB)
      transmissionDelay: 0, // delay of each transmission, higher value saves more cpu resources, lower upload speed. default is 0(no delay)
      overwrite: false, // overwrite file if exists, default is true.
      rename: function (filename, fileInfo) {
        var file = path.parse(filename);
        var fname = file.name;
        var ext = file.ext;
        return `${YY}${MM}${DD}_${mm}${SS}_${fname}${ext}`;
      }
  });
uploader.on('start', (fileInfo) => {
  if (fs.existsSync('public/UserProfile/' + username) == false) {
    fs.mkdirSync('public/UserProfile/' + username);
  }
  if (fs.existsSync('public/UserProfile/' + username + '/Upload') == false) {
    fs.mkdirSync('public/UserProfile/' + username + '/Upload');
  }
  console.log('Start uploading');
});
uploader.on('stream', (fileInfo) => {
  // console.log(`${fileInfo.wrote} / ${fileInfo.size} byte(s)`);
});
uploader.on('complete', (fileInfo) => {
  console.log('Upload Complete.');
  try {
    upS3.upImg('public/UserProfile/' + username + '/Upload', fileInfo.name, io, socket, username);

  } catch (e) {
    console.log(e.code);
    console.log(e);
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
  uploadImg: uploadImg
}
