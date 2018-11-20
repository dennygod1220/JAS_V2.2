const Server = use('Server')
const io = use('socket.io')(Server.getInstance())
const fs = use('fs')
var rd = use('rd');
var find = use('find');
var dir = use('node-dir');
var FC = require('../cusmodules/FileControl');


io.on('connection', function (socket) {
  console.log("ID: " + socket.id + " 連線");


  //Client 選擇裝置後 ， 告訴Server -> Server 告訴裝置 可用版位大小目錄
  socket.on('CtoS which device', function (device) {

    //取得 裝置 底下所有的目錄

    var path = './public/DemoPage/site/' + device.device + '/';
    try {
      display_subdir(path, 'StoC device dir');
    } catch (e) {
      console.log(e);
    }
  })


  //Client 選擇版位大小目錄後 告訴server -> Server 告訴Client可用 網站
  socket.on('CtoS which ZoneSize', function (ZoneSize) {
    //取得 裝置/版位大小 底下所有的目錄

    var path = './public/DemoPage/site/' + ZoneSize.Device + '/' + ZoneSize.ZoneSize + '/';
    display_subdir(path, 'StoC site dir');
  })


  //Client 選擇自訂版位
  socket.on('CtoS which Site', function (Site) {

    var src = './public/DemoPage/site/' + Site.Device + '/' + Site.ZoneSize + '/' + Site.site + '/index.html';
    var dist = './public/DemoPage/site/' + Site.Device + '/' + Site.ZoneSize + '/' + Site.site + '/CusZone_' + socket.id + '.html';
    //複製檔案
    copyFile(src, dist);

    var getFunName = './public/DemoPage/site/' + Site.Device + '/' + Site.ZoneSize + '/' + Site.site + '/JAS_FuncName.txt';
    //讀取 此網站所使用的function Name 將他require進來
    fs.readFile(getFunName, 'utf8', function (err, funcName) {
      if (err) throw err;
      var SetCustomZone = require('../cusmodules/ZoneChange/custom/' + funcName);
      fs.readFile(dist, 'utf8', function (err, html) {
        try {
          SetCustomZone(html, Site.zone_info).then(async function (htmlcode) {
            await fs.writeFile(dist, htmlcode, function (err) {
              if (err) {
                console.log("socketjs 53 has an error");
              }
            })
          })
        } catch (e) {
          console.log("custom zone socket.js has an error!!");
          console.log(e);
        }

      })

      //告訴 Client 自訂版位OK
      io.sockets.connected[socket.id].emit('StoC cus zone ok', {
        CusZoneUrl: '/DemoPage/site/' + Site.Device + '/' + Site.ZoneSize + '/' + Site.site + '/CusZone_' + socket.id + '.html',
      });
    })

    // display_subdir(path,'StoC site dir');
  })



  //=========================================================================
  //=======================ADMIN ADD=========================================
  //=========================================================================
  socket.on('CtoS add setoption', function (data) {
    fs.readFile('public/JS/Scrape/config.json', 'utf8', function (err, config) {
      if (err) throw err;
      var obj = JSON.parse(config);
      var arr = [];
      arr.push(data.url);
      arr.push(data.SiteName);
      arr.push(data.ZoneSize);
      if (data.PCorPhone == "PC") {
        arr.push(false);
      } else {
        arr.push(true);
      }
      arr.push(data.FuncName);
      obj.set.push(arr);
      var newobj = JSON.stringify(obj)

      fs.writeFile('public/JS/Scrape/config.json', newobj, function (err) {
        if (err) {
          console.log(err);
        } else {
          //告訴client 好了，戴上定義JS的內容
          io.sockets.connected[socket.id].emit('StoC Cus Js Temp');
        }
      })
    })
  })

  //============================================================
  //=================Client 給 Server 網站改版位的JS code========
  //============================================================
  socket.on('CtoS cus site js', function (code) {

    try {
      var Default_JS = code.default_func;
      var df_src = "cusmodules/ZoneChange/basic/template.txt";
      var df_dist = "cusmodules/ZoneChange/basic/" + code.FuncName + ".txt";
      copyFile(df_src, df_dist);
      fs.appendFileSync(df_dist, Default_JS);
      fs.appendFileSync(df_dist, "return $.html();}");
      copyFile(df_dist, "cusmodules/ZoneChange/basic/" + code.FuncName + ".js");
      FC.Remove(df_dist);
    } catch (e) {
      console.log("Socket.js Add Default Zone Code has an error!!!");
      console.log(e);
    }

    try {
      var Custom_JS = code.cus_cunc;
      var cs_src = "cusmodules/ZoneChange/custom/template.txt";
      var cs_dist = "cusmodules/ZoneChange/custom/" + code.FuncName + ".txt";
      copyFile(cs_src, cs_dist);
      fs.appendFileSync(cs_dist, Custom_JS);
      fs.appendFileSync(cs_dist, "return $.html();}");
      copyFile(cs_dist, "cusmodules/ZoneChange/custom/" + code.FuncName + ".js");
      FC.Remove(cs_dist);
    } catch (e) {
      console.log("Socket.js Add Custom Zone Code has an error!!!");
      console.log(e);
    }
  })


  //======================================================
  //==================純下載網站===========================
  //======================================================

  socket.on('CtoS download site info', function (data) {
    console.log(data);
    var dl = require('../public/JS/Scrape/only_download_site');
    if (data.PCorPhone == "PC") {
      dl.only_download_site(data.url, data.SiteName, false);
    } else {
      dl.only_download_site(data.url, data.SiteName, true);
    }
  })

  //===============================================
  socket.on('disconnect', (reason) => {
    console.log("Leave");
  });



  //======================================================
  //======================PREROLL=========================
  //======================================================

  socket.on('CtoS tell me PreRoll site', function () {
    var PreRoll_Dir = './public/DemoPage/preroll/';
    display_subdir(PreRoll_Dir, 'StoC can use PreRoll Site');
  })

  //======================================================
  //======================內文全屏=========================
  //======================================================

  socket.on('CtoS tell me Content_zone site', function () {
    var Content_zone = './public/DemoPage/site/phone/內文全屏/';
    display_subdir(Content_zone, 'StoC can use Content_zone Site');
  })

  //Client 選擇自訂版位
  socket.on('CtoS Content_zone Site', function (Site) {

    var src = './public/DemoPage/site/phone/內文全屏/' + Site.site + '/index.html';
    var dist = './public/DemoPage/site/phone/內文全屏/' + Site.site + '/CusZone_' + socket.id + '.html';
    //複製檔案
    copyFile(src, dist);

    var getFunName = './public/DemoPage/site/phone/內文全屏/' + Site.site + '/JAS_FuncName.txt';
    //讀取 此網站所使用的function Name 將他require進來
    fs.readFile(getFunName, 'utf8', function (err, funcName) {
      if (err) throw err;
      var df = require('../public/JS/DemoPage_Zone_set/' + funcName);
      fs.readFile(dist, 'utf8', function (err, html) {
        df.SetCusZone(html, dist, Site.zone_code);
      })

      //告訴 Client 自訂版位OK
      io.sockets.connected[socket.id].emit('StoC cus content zone ok', {
        CusZoneUrl: '/DemoPage/site/phone/內文全屏/' + Site.site + '/CusZone_' + socket.id + '.html',
      });
    })

    // display_subdir(path,'StoC site dir');
  })


  //======================================================
  //======================管理DemoPage 設定檔==============
  //======================================================

  socket.on('CtoS business cron config', function () {
    var config_json = FC.readjsonSync('public/JS/Scrape/config.json');
    io.sockets.connected[socket.id].emit('StoC business cron config', {
      config_json: config_json.set
    })
  })

  //接收Client 傳來的 要刪除的資訊
  socket.on('CtoS remove business cron config', function (data) {
    try {
      var config_json = FC.readjsonSync('public/JS/Scrape/config.json');
      var config_info = config_json.set[data.config_index];
      config_json.set.splice(data.config_index, 1);
      var string_obj = JSON.stringify(config_json);
      fs.writeFileSync('public/JS/Scrape/config.json', string_obj);

      var basic = FC.Exists("cusmodules/ZoneChange/basic/" + config_info[4] + ".js");
      var custom = FC.Exists("cusmodules/ZoneChange/custom/" + config_info[4] + ".js");

      if (basic == true) {
        try {
          FC.Remove("cusmodules/ZoneChange/basic/" + config_info[4] + ".js");
        } catch (e) {

        }
      }
      if (custom == true) {
        try {
          FC.Remove("cusmodules/ZoneChange/custom/" + config_info[4] + ".js");
        } catch (e) {

        }
      }
      //手機板
      if (config_info[3] == true) {
        var site_path = "public/DemoPage/site/phone/" + config_info[2] + "/" + config_info[1];
      } else {
        var site_path = "public/DemoPage/site/PC/" + config_info[2] + "/" + config_info[1];
      }
      var site_exist = FC.Exists(site_path);
      if (site_exist == true) {
        try {
          FC.Remove(site_path);
        } catch (e) {

        }
      }

    } catch (e) {
      console.log("socket.js CtoS remove business cron config Has an Error!!!!");
      console.log(e);
    }

  })

  //======================================================
  //           File upload test
  //======================================================
  var AWS = use('aws-sdk');
  var SocketIOFile = use('socket.io-file');
  var ffmpeg = use('ffmpeg');

  var uploader = new SocketIOFile(socket, {
    // uploadDir: {			// multiple directories
    // 	music: 'data/music',
    // 	document: 'data/document'
    // },
    uploadDir: 'public/uploadtest', // simple directory
    accepts: ['image/jpeg', 'image/png', 'video/mp4', 'image/gif'], // chrome and some of browsers checking mp3 as 'audio/mp3', not 'audio/mpeg'
    maxFileSize: 20971520, // 4 MB. default is undefined(no limit)
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
    // console.log(fileInfo);
    try {
      var process = new ffmpeg('public/uploadtest/'+fileInfo.name);
      process.then(function (video) {
        video
        .setVideoSize('640x?', true, true, '#fff')
        .setVideoFrameRate(10)
        .setVideoBitRate(512)
        .save('public/uploadtest/2.mp4',function(error,file){
          if(!error){
            console.log('video file:' + file); 
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
  //======================================================
  //======================================================
  //======================================================
  //=====================MY Function======================
  //======================================================
  //======================================================
  //======================================================

  //==========複製檔案
  function copyFile(src, dist) {
    console.log("COPY " + dist);

    fs.writeFileSync(dist, fs.readFileSync(src));
  }

  //=======顯示目錄
  function display_subdir(path, con_name) {
    try {
      fs.readdir(path, function (err, files) {
        //声明一个数组存储目录下的所有文件夹
        var floder = [];
        //从数组的第一个元素开始遍历数组
        (function iterator(i) {
          //遍历数组files结束
          if (files != undefined) {
            try {
              if (i == files.length) {
                io.sockets.connected[socket.id].emit(con_name, {
                  dir: floder,
                })
                return;
              }
            } catch (e) {
              io.sockets.connected[socket.id].emit(con_name, {
                dir: ["錯誤! 沒有檔案"],
              })
            }
          }
          //遍历查看目录下所有东西
          try {
            fs.stat(path + files[i], function (err, stats) {
              //如果是文件夹，就放入存放文件夹的数组中
              if (stats.isDirectory()) {
                floder.push(files[i]);
              }
              iterator(i + 1);
            })
          } catch (e) {
            io.sockets.connected[socket.id].emit(con_name, {
              dir: ["錯誤! 沒有檔案"],
            })
          }
        })(0)
      })
    } catch (e) {
      console.track(e);
    }
  }


})