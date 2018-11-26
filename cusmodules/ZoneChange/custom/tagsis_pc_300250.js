module.exports = async (htmlcode,zone) => {
  var cheerio = require('cheerio');
  var $ = cheerio.load(htmlcode);var b = $('.ads-box.center')[1];

$(b).children().remove();
$(b).append(zone);return $.html();}