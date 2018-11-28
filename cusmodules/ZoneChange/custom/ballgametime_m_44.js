module.exports = async (htmlcode,zone) => {
  var cheerio = require('cheerio');
  var $ = cheerio.load(htmlcode);var b = $('#endText>p>.posts-cjtz.content-cjtz-mini.clearfix')[0];
$(b).children().remove();
$(b).append(zone);return $.html();}