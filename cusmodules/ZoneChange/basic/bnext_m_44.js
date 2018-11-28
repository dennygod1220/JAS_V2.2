module.exports = async (htmlcode) => {
    var cheerio = require('cheerio');
    var $ = cheerio.load(htmlcode);
  
 
  var b = $('#ad-view-in-article-2nd_7_0');
  $(b).removeAttr('data-pos');
$(b).removeAttr('class');
$(b).children().remove();
$(b).append('<ins class="clickforceads" style="display:inline-block;width:4px;height:4px;" data-ad-zone="8730"></ins><script async type="text/javascript" src="//cdn.doublemax.net/js/init.js"></script>');return $.html();}