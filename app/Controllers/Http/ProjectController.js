'use strict'

var AWS = use('aws-sdk');
var FC = require('../../../cusmodules/FileControl');
var key = FC.readjsonSync('S3config.json');
var fs = use('fs');
const Helpers = use('Helpers');

class ProjectController {
  async test() {

    var s3 = new AWS.S3({
      accessKeyId: key.accessKeyId,
      secretAccessKey: key.secretAccessKey,
    });
    
    var fi = fs.readFileSync('public/uploadtest/1.mp4');
    console.log(fi);
    
    var params = {
      Bucket: key.Bucket,
      Key: 'dev/Jason/test/test.mp4',
      ACL: 'public-read',
      Body:fi
    };
    s3.upload(params).on('httpUploadProgress', function (evt) {

      //上傳進度
      console.log(evt);
    }).
    send(function (err, data) {

      //上傳完畢或是碰到錯誤

    });
  }

  async test2(){

  }


  async downloadContentCover_nobanner({request,response}){
    var user = request.params.user;
    var file = decodeURIComponent(request.params.filename);
    response.attachment('./public/UserProfile/'+user+'/Project/'+file);
    return
  }
}

module.exports = ProjectController
