module.exports = async (htmlcode) => {
  var cheerio = require('cheerio');
  var $ = cheerio.load(htmlcode);


  var b = $('#main-header > div > div.etad');
  $(b).children().remove();
  $(b).append('<ins class="clickforceads" style="display:inline-block;width:970px;height:250px;" data-ad-zone="8727"></ins><script async type="text/javascript" src="//cdn.doublemax.net/js/init.js"></script>');
  return $.html();
}
