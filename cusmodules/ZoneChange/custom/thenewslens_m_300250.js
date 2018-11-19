module.exports = async (htmlcode,zone) => {
  var cheerio = require('cheerio');
  var $ = cheerio.load(htmlcode);
  
  $("#div-gpt-ad-1516246245198-3").children().remove();
  $("#div-gpt-ad-1516246245198-3").append('<div style="text-align: center;">'+zone+'</div>');

  return $.html();
}
