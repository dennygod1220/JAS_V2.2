module.exports = async (htmlcode,zone) => {
  var cheerio = require('cheerio');
  var $ = cheerio.load(htmlcode);var b = $('#div-gpt-ad-1502440076374-0');
$(b).removeAttr('class');
$(b).children().remove();
$(b).append(zone);return $.html();}