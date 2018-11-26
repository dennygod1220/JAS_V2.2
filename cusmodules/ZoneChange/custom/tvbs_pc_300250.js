module.exports = async (htmlcode,zone) => {
  var cheerio = require('cheerio');
  var $ = cheerio.load(htmlcode);var b = $('#v4_news_desktop_index_rec_L1');
$(b).children().remove();
$(b).append('<div style="text-align: center;">'+zone+'</div>');return $.html();}