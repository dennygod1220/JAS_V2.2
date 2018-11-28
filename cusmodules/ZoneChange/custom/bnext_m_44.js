module.exports = async (htmlcode,zone) => {
  var cheerio = require('cheerio');
  var $ = cheerio.load(htmlcode);
  var b = $('#ad-view-in-article-2nd_7_0');
  $(b).removeAttr('data-pos');
$(b).removeAttr('class');
$(b).children().remove();
$(b).append(zone);return $.html();}