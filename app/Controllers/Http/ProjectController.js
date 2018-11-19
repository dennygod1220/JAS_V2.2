'use strict'

var AWS = use('aws-sdk');
var FC = require('../../../cusmodules/FileControl');
var key = FC.readjsonSync('S3config.json');

class ProjectController {
  async test() {

    var s3 = new AWS.S3({
      accessKeyId: key.accessKeyId,
      secretAccessKey: key.secretAccessKey,
    });
    var params = {
      Bucket: key.Bucket,
      Prefix: 'dev/Jason/test'
    }
    s3.listObjectsV2(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else console.log(data); // successful response
    });
  }
}

module.exports = ProjectController
