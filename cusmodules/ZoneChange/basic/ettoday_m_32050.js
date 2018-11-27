module.exports = async (htmlcode) => {
    var cheerio = require('cheerio');
    var $ = cheerio.load(htmlcode);
  
 
  var b = $('#mobileweb_320x50_fixed');
$(b).children().remove();
$(b).append('<ins class="clickforceads" style="display:inline-block;width:320px;height:50px;" data-ad-zone="8783"></ins><script async type="text/javascript" src="//cdn.doublemax.net/js/init.js"></script>');return $.html();}