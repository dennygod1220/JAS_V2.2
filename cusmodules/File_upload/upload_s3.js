var AWS = use('aws-sdk');
var FC = require('../FileControl');
var key = FC.readjsonSync('S3config.json');


function up(path,filename,io,socket){
    var s3 = new AWS.S3({
        accessKeyId: key.accessKeyId,
        secretAccessKey: key.secretAccessKey,
      });
      
      var fi = fs.readFileSync(path);
      
      var params = {
        Bucket: key.Bucket,
        Key: 'dev/Jason/test/'+filename,
        ACL: 'public-read',
        Body:fi
      };
      s3.upload(params).on('httpUploadProgress', function (evt) {
  
        //上傳進度
        console.log(evt);
      }).
      send(function (err, data) {
  
        //上傳完畢或是碰到錯誤
        io.sockets.connected[socket.id].emit('StoC video convert ok');
      });
}

module.exports={
    up:up
}