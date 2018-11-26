module.exports = async (htmlcode,zone) => {
  var cheerio = require('cheerio');
  var $ = cheerio.load(htmlcode);$('#div-gpt-ad-1509082306527-0').remove();
var b = $('#div-gpt-ad-1502331013415-1');
b.css('display','block');
$(b).removeAttr('data-google-query-id');
$(b).children().remove();
$(b).append(zone);return $.html();}