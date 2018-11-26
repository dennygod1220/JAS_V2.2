module.exports = async (htmlcode,zone) => {
  var cheerio = require('cheerio');
  var $ = cheerio.load(htmlcode);var b = $('#div-gpt-ad-1531455219553-0');
$(b).removeAttr('data-google-query-id');
$(b).children().remove();
$(b).append(zone);return $.html();}