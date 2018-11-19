module.exports =async (htmlcode,zone) => {
  var cheerio = require('cheerio');
  var $ = cheerio.load(htmlcode);
  
  var b = $("#right-box > div > div.articles > div.ads-box.center");
  $(b).children().remove();
  $(b).append(zone);

  return $.html();
}
