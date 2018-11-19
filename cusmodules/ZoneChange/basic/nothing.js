module.exports = async (htmlcode) => {
  var cheerio = require('cheerio');
  var $ = cheerio.load(htmlcode);


  return $.html();}
