module.exports = async (htmlcode,zone) => {
  var cheerio = require('cheerio');
  var $ = cheerio.load(htmlcode);

  $(".etad").children().remove();
  $(".etad").append('<div style="text-align: center;">'+zone+'</div>');

  return $.html();
}
