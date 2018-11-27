'use strict'
var fs = use('fs');
class WelcomeController {
  async index({view,auth}) {
    var username = auth.user.username.trim();
    var project_file = fs.readdirSync('public/UserProfile/' + username + '/Project');
    var DemoPage_site = fs.readdirSync('public/UserProfile/' + username + '/DemoPage');
    return view.render('welcome', {
      project_file: project_file,
      DemoPage_site:DemoPage_site
    });
  }
}

module.exports = WelcomeController
