module.exports = async (htmlcode,zone) => {
  var cheerio = require('cheerio');
  var $ = cheerio.load(htmlcode);
  
  $('#div-gpt-ad-1509688054398-0').remove();

  var b = $('#div-gpt-ad-1509687914233-0');
  b.css('display','block');
$(b).removeAttr('data-google-query-id');
$(b).children().remove();
$(b).append(zone);return $.html();}