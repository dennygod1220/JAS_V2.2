module.exports = async (htmlcode,zone) => {
  var cheerio = require('cheerio');
  var $ = cheerio.load(htmlcode);
  var b = $('#article_view_body > div.main_block > div > div > div.container-fluid.view_main > div > div.col.ctnBox > div.content.htmlview > article > div.ad_box');
$(b).removeAttr('class');
$(b).children().remove();
$(b).append(zone);return $.html();}