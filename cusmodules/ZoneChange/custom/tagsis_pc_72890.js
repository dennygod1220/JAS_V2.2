module.exports = async (htmlcode,zone) => {
  var cheerio = require('cheerio');
  var $ = cheerio.load(htmlcode);var b = $('div.ads-box.ads-728.center')[0];
$(b).children().remove();
$(b).append(zone);return $.html();}