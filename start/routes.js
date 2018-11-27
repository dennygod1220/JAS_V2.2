'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//==========auth===========================
Route.on('/signup').render('auth.signup');
Route.post('/signup', 'UserController.create').validator('CreateUser');
Route.get('/logout', 'UserController.logout');
Route.on('/login').render('auth.login');
Route.post('/login', 'UserController.login').validator('LoginUser');

//=====================================
Route.group(() => {
  Route.get('/', 'WelcomeController.index');

  Route.get('/Business', ({view}) => view.render('business/index'));

  Route.get('/Project',({view})=>view.render('project/index'));
  Route.get('/Project/test2',({view})=>view.render('project/test2'));
  Route.get('/Project/test','ProjectController.test');
  Route.get('/Project/contentcover_nobanner',({view})=>view.render('project/contentcover_nobanner'));
  //下載檔案
  Route.get('/Project/download/public/UserProfile/:user/Project/:filename','ProjectController.downloadContentCover_nobanner');

  //=======啟動 Crontab==========
  Route.get('Cron', 'CronJobController.index')
  // Route.get('CronStart', 'CronJobController.start')
  Route.get('CronStart','CronJobController.start2')

}).middleware(['auth']);

Route.group(()=>{
  //======管理頁面===============
  Route.get('/','AdminController.index') 
  Route.get('/business/demopage','AdminController.demopage')
  Route.get('/business/demopage/add','AdminController.demopage_add')
  Route.get('/business/demopage/manage_config','AdminController.manage_config')
  Route.get('/download_site','AdminController.download_site')
}).prefix('/admin');
