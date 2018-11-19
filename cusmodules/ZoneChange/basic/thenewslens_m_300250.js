module.exports = async (htmlcode) => {
  var cheerio = require('cheerio');
  var $ = cheerio.load(htmlcode);
  
  $("#div-gpt-ad-1516246245198-3").children().remove();
  $("#div-gpt-ad-1516246245198-3").append('<div style="text-align: center;"><ins class="clickforceads" style="display:inline-block;width:300px;height:250px;" data-ad-zone="8707"></ins><script async type="text/javascript" src="//cdn.doublemax.net/js/init.js"></script></div>');

  return $.html();
}
