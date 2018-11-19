module.exports =async (htmlcode) => {
  var cheerio = require('cheerio');
  var $ = cheerio.load(htmlcode);
  
  var b = $('.news.boxpadding.noP');
  b.append('<li><div style="width:100%;text-align:center;"><ins class="clickforceads" style="display:inline-block;width:4px;height:4px;" data-ad-zone="8730"></ins><script async type="text/javascript" src="//cdn.doublemax.net/js/init.js"></script></div></li>');
  return $.html();
}
