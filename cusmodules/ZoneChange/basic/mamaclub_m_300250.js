module.exports = async (htmlcode) => {
    var cheerio = require('cheerio');
    var fs = require('fs');
    var $ = cheerio.load(htmlcode);
  
 
  var img_dir = fs.readdirSync('public/DemoPage/site/phone/300250/媽媽經/images/');
                img_dir.forEach(element => {
                    fs.renameSync('public/DemoPage/site/phone/300250/媽媽經/images/' + element, 'public/DemoPage/site/phone/300250/媽媽經/images/' + decodeURIComponent(escape(element)));
                });
                var b = $('#ad-gorgeous');
                $(b).removeAttr('class');
                $(b).children().remove();
                $(b).append('<div style="text-align: center;"><ins class="clickforceads" style="display:inline-block;width:300px;height:250px;" data-ad-zone="8707"></ins><script async type="text/javascript" src="//cdn.doublemax.net/js/init.js"></script></div>');return $.html();}