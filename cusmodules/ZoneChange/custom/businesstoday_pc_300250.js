module.exports = async (htmlcode,zone) => {
  var cheerio = require('cheerio');
  var $ = cheerio.load(htmlcode);$('#div-gpt-ad-1510817957123-0').remove();
var b = $('#div-gpt-ad-1510818917703-0');
b.css('display','block');
$(b).removeAttr('data-google-query-id');
$(b).children().remove();
$(b).append(zone);return $.html();}