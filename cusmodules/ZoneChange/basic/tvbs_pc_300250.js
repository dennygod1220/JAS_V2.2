module.exports = async (htmlcode) => {
    var cheerio = require('cheerio');
    var $ = cheerio.load(htmlcode);
  
 
  var b = $('#v4_news_desktop_index_rec_L1');
$(b).children().remove();
$(b).append('<div style="text-align: center;"><ins class="clickforceads" style="display:inline-block;width:300px;height:250px;" data-ad-zone="8707"></ins><script async type="text/javascript" src="//cdn.doublemax.net/js/init.js"></script></div>');return $.html();}