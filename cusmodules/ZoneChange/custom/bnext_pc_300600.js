module.exports = async (htmlcode,zone) => {
  var cheerio = require('cheerio');
  var $ = cheerio.load(htmlcode);var b = $('#ad-view-side-02_0');
  $(b).removeAttr('class');
  $(b).removeAttr('data-pos');
$(b).children().remove();
$(b).append(zone);return $.html();}