module.exports = async (htmlcode) => {
    var cheerio = require('cheerio');
    var $ = cheerio.load(htmlcode);
  
 
  var b = $('.innerAdBlk')[0];
$(b).children().remove();
$(b).append('<ins class="clickforceads" style="display:inline-block;width:728px;height:90px;" data-ad-zone="8726"></ins><script async type="text/javascript" src="//cdn.doublemax.net/js/init.js"></script>');return $.html();}