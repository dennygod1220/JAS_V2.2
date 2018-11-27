'use strict'
var fs = use('fs');
class WelcomeController {
  async index({view,auth}) {
    var username = auth.user.username.trim();
    var project_file = fs.readdirSync('public/UserProfile/' + username + '/Project');
    var DemoPage_site = fs.readdirSync('public/UserProfile/' + username + '/DemoPage');
    console.log(DemoPage_site);
    
    return view.render('welcome', {
      project_file: project_file,
      DemoPage_site:DemoPage_site
    });
  }

  async index2({view,auth}) {

    
    return view.render('welcome');
  }
}

module.exports = WelcomeController
