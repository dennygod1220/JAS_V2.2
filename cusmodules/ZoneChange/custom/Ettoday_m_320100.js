module.exports = async (htmlcode,zone) => {
  var cheerio = require('cheerio');
  var $ = cheerio.load(htmlcode);var b = $('#mobileweb_320x50_fixed');
$(b).children().remove();
$(b).append(zone);return $.html();}