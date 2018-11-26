module.exports = async (htmlcode) => {
    var cheerio = require('cheerio');
    var $ = cheerio.load(htmlcode);
  
 
  var b = $('#ad-list-mobi-01-sm');
  $(b).removeAttr('class');
$(b).children().remove();
$(b).append('<ins class="clickforceads" style="display:inline-block;width:300px;height:250px;" data-ad-zone="8707"></ins><script async type="text/javascript" src="//cdn.doublemax.net/js/init.js"></script>');return $.html();}