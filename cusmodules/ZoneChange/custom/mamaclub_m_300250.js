module.exports = async (htmlcode,zone) => {
  var cheerio = require('cheerio');
  var $ = cheerio.load(htmlcode);var b = $('#ad-gorgeous');
                $(b).removeAttr('class');
                $(b).children().remove();
                $(b).append('<div style="text-align: center;">' + zone + '</div>');return $.html();}