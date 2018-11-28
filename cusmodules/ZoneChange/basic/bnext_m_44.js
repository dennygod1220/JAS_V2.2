module.exports = async (htmlcode) => {
    var cheerio = require('cheerio');
    var $ = cheerio.load(htmlcode);
  
 
  var b = $('#article_view_body > div.main_block > div > div > div.container-fluid.view_main > div > div.col.ctnBox > div.content.htmlview > article > div.ad_box');
$(b).removeAttr('class');
$(b).children().remove();
$(b).append('<ins class="clickforceads" style="display:inline-block;width:4px;height:4px;" data-ad-zone="8730"></ins><script async type="text/javascript" src="//cdn.doublemax.net/js/init.js"></script>');return $.html();}