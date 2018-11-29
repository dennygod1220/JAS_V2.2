'use strict'

var scrape = use('website-scraper');
var fs = use('fs');
var path = use("path");
var cron = use('node-cron');
var rimraf = use('rimraf');
var cheerio = use('cheerio');
var basic_zone = require('../../../cusmodules/ZoneChange/basic_zone');

var sc = require('../../../cusmodules/Scrape/scrape');
var FC = require('../../../cusmodules/FileControl');

class CronJobController {

  async index({
    view
  }) {
    return view.render('CronDownloadSite.index');
  }


  async start2() {
    cron.schedule('1 10 * * * *', async()=>{
        FC.readjson('public/JS/Scrape/config.json').then(async function (obj) {
          var len = obj.set.length;
          for (var x = 0; x < len; x++) {
            await sc.set_option(obj.set[x][0], obj.set[x][1], obj.set[x][2], obj.set[x][3], obj.set[x][4]);
          }
        })
      })
    }
  }

  module.exports = CronJobController
