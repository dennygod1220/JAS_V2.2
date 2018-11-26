module.exports = async (htmlcode) => {
    var cheerio = require('cheerio');
    var $ = cheerio.load(htmlcode);
  
 
  $('#div-gpt-ad-1509082306527-0').remove();
var b = $('#div-gpt-ad-1502331013415-1');
b.css('display','block');
$(b).removeAttr('data-google-query-id');
$(b).children().remove();
$(b).append('<ins class="clickforceads" style="display:inline-block;width:300px;height:600px;" data-ad-zone="8708"></ins><script async type="text/javascript" src="//cdn.doublemax.net/js/init.js"></script>');return $.html();}