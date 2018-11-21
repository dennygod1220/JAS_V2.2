var socket = io();

var uploader = new SocketIOFileClient(socket);
var form = document.getElementById('form');

uploader.on('start', function (fileInfo) {
  console.log('Start uploading', fileInfo);
});
uploader.on('stream', function (fileInfo) {
  console.log('Streaming... sent ' + fileInfo.sent + ' bytes.');
  $("#percent").text((((fileInfo.sent) / (fileInfo.size)) * 100).toFixed(3) + "%");
  $("#percent").css('width', Math.round((((fileInfo.sent) / (fileInfo.size)) * 100)) + "%");
});
uploader.on('complete', function (fileInfo) {
  console.log('Upload Complete', fileInfo);
});
uploader.on('error', function (err) {
  $("#percent").text(err.message);
  $("#percent").css({
    "background-color": "rgba(200,0,0,0.8)",
    "width": "100%"
  });
  $("#btn_send").css('display', 'block');
  $("#loading").css('display', 'none');
});
uploader.on('abort', function (fileInfo) {
  console.log('Aborted: ', fileInfo);
});

form.onsubmit = function (ev) {
  $("#loading").css('display', 'block');
  $("#btn_send").css('display', 'none');
  ev.preventDefault();

  var fileEl = document.getElementById('file');
//   uploader.upload(fileEl);
    uploader.upload(fileEl, {
      data: {
          user:$("#username").text().trim()
      }
    });
};

//影片壓縮完成
socket.on('StoC video convert ok', function () {
  $("#percent").text("100% 完成");
  $("#percent").css("background-color", "rgba(30,210,60,0.8)");
  $("#loading").css('display', 'none');
  $("#btn_send").css('display', 'block');
})

//影片壓縮失敗
socket.on('StoC video convert has error', function () {
    $("#percent").text("影片壓縮失敗!");
  $("#percent").css({
    "background-color": "rgba(200,0,0,0.8)",
    "width": "100%"
  });
  $("#loading").css('display', 'none');
  $("#btn_send").css('display', 'block');
})
