module.exports = async (htmlcode,zone) => {
  var cheerio = require('cheerio');
  var $ = cheerio.load(htmlcode);var b = $('#div-gpt-ad-1451975480132-0');
$(b).removeAttr('data-google-query-id');
$(b).children().remove();
$(b).append(zone);return $.html();}