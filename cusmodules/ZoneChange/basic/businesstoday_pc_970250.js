module.exports = async (htmlcode) => {
    var cheerio = require('cheerio');
    var $ = cheerio.load(htmlcode);
  
    $('#div-gpt-ad-1509688054398-0').remove();
  var b = $('#div-gpt-ad-1509687914233-0');
  b.css('display','block');
$(b).removeAttr('data-google-query-id');
$(b).children().remove();
$(b).append('<ins class="clickforceads" style="display:inline-block;width:970px;height:250px;" data-ad-zone="8727"></ins><script async type="text/javascript" src="//cdn.doublemax.net/js/init.js"></script>');return $.html();}