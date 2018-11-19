module.exports = async (htmlcode, zone) => {
  var cheerio = require('cheerio');
  var $ = cheerio.load(htmlcode);
  var b = $('#main-header > div > div.etad');
  $(b).children().remove();
  $(b).append(zone);
  return $.html();
}
