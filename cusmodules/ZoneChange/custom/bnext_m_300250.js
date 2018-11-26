module.exports = async (htmlcode,zone) => {
  var cheerio = require('cheerio');
  var $ = cheerio.load(htmlcode);var b = $('#ad-list-mobi-01-sm');
  $(b).removeAttr('class');
$(b).children().remove();
$(b).append(zone);return $.html();}