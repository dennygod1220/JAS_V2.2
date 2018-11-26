module.exports = async (htmlcode) => {
    var cheerio = require('cheerio');
    var $ = cheerio.load(htmlcode);
  
 
  var b = $('#ad-view-side-02_0');
  $(b).removeAttr('class');
  $(b).removeAttr('data-pos');
$(b).children().remove();
$(b).append('<ins class="clickforceads" style="display:inline-block;width:300px;height:600px;" data-ad-zone="8708"></ins><script async type="text/javascript" src="//cdn.doublemax.net/js/init.js"></script>');return $.html();}