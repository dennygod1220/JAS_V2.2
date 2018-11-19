module.exports =async (htmlcode,zone) => {
  var cheerio = require('cheerio');
  var $ = cheerio.load(htmlcode);
  
  var b = $('.news.boxpadding.noP');
  b.append('<li><div style="width:100%;text-align:center;">'+zone+'/div></li>');
  return $.html();
}
