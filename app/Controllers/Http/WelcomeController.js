'use strict'
var fs = use('fs');
var FC = require('../../../cusmodules/FileControl');
class WelcomeController {
  async index({view,auth}) {
    var DemoPage_site;
    var project_file;
    var username = auth.user.username.trim();
    if(FC.Exists('public/UserProfile/' + username + '/Project') == true){
        project_file = fs.readdirSync('public/UserProfile/' + username + '/Project');
    }else{
        project_file = '';
    }
    if(FC.Exists('public/UserProfile/' + username + '/DemoPage') == true){
        DemoPage_site = fs.readdirSync('public/UserProfile/' + username + '/DemoPage');
    }else{
        DemoPage_site = '';
    }
        

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
