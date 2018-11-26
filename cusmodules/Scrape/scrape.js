var scrape = require('website-scraper');
var BZ = require('../ZoneChange/basic_zone');
var cheerio = require('cheerio');
var FC = require('../FileControl');
var fs = require('fs');
// set_option(網址,目錄,版位大小,手機還是電腦,設定版位的function name)
async function set_option(url, dir, zonesize, phone, modify_name = false) {


  var path_prefix = "public/DemoPage/site";
  var phone = phone;

  var pc_dir_path = path_prefix + '/PC/' + zonesize + '/' + dir;
  var phone_dir_path = path_prefix + '/phone/' + zonesize + '/' + dir;

  var pc_OnlyDownloadSiteDir = "public/DownLoadSite/PC/" + zonesize + '/' + dir;
  var phone_OnlyDownloadSiteDir = "public/DownLoadSite/phone/" + zonesize + '/' + dir;

  if (modify_name == false || modify_name == "nothing") {
    //如果該目錄已經存在，先將此目錄刪除
    if (phone == true) {
      //手機板
      if (FC.Exists(phone_OnlyDownloadSiteDir)) {
        FC.Remove(phone_OnlyDownloadSiteDir);
      }
    } else {
      //PC版
      if (FC.Exists(pc_OnlyDownloadSiteDir)) {
        FC.Remove(pc_OnlyDownloadSiteDir);
      }
    }

    if (phone == true) {
      var a = {
        urls: [url],
        directory: phone_OnlyDownloadSiteDir,
        request: {
          headers: {
            'content-type': 'charset=UTF-8',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 4 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19',
          }
        },
      };
    } else {
      var a = {
        urls: [url],
        directory: pc_OnlyDownloadSiteDir,
        request: {
          headers: {
            'content-type': 'charset=UTF-8',
          }
        },
      };
    }
    
  } else {
    //如果該目錄已經存在，先將此目錄刪除
    if (phone == true) {
      //手機板
      if (FC.Exists(phone_dir_path)) {
        FC.Remove(phone_dir_path);
      }
    } else {
      //PC版
      if (FC.Exists(pc_dir_path)) {
        FC.Remove(pc_dir_path);
      }
    }
    //呼叫此function 後 會將 options 參數push進options 陣列
    if (phone == true) {
      var a = {
        urls: [url],
        directory: phone_dir_path,
        request: {
          headers: {
            'content-type': 'charset=UTF-8',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 4 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19',
          }
        },
      };
    } else {
      var a = {
        urls: [url],
        directory: pc_dir_path,
        request: {
          headers: {
            'content-type': 'charset=UTF-8',
          }
        },
      };
    }
  }



  setTimeout(() => {
    try {
      process.setMaxListeners(0);
      console.log(dir + "_" + zonesize + "  開始下載!");

      scrape(a).then((result) => {
        console.log(dir + "_" + zonesize + "  下載完成!!");

        // BZ.modifyhtml(a.directory, modify_name);
        FC.AppendFile(a.directory + '/JAS_FuncName.txt', modify_name);
        if (modify_name == false || modify_name == "nothing") {
          //function name == nothing or 不指定function name
        } else {
          FC.ReadFile(a.directory + '/index.html').then(function (htmlcode) {

            var b = require('../ZoneChange/basic/' + modify_name);
            try {
              b(htmlcode).then(async function (data) {
                //複製一個defaultZone  
                await fs.writeFile(a.directory + '/DefaultZone.html', data, function () {

                });
              });

            } catch (e) {
              console.log("Some Error From use basic zone function :" + modify_name);
              console.log(e);
            }

          });
        }
      }).catch(console.log);
    } catch (e) {
      console.log("scrape.js No.52 setTimeout has an error!!!")
    }

  }, 1500);
}

module.exports = {
  set_option: set_option
}
