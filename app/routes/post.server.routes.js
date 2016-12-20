var postController = require('../controllers/post.server.controller')
var path = require('path')

module.exports = function(app){
	app.route('/public/login').post(postController.login)
	app.route('/public/register').post(postController.register)
	app.route('/public/preliminaryContestData').get(postController.preliminaryContestData)
	app.route('/public/intermediaryContestData').get(postController.intermediaryContestData)
	app.route('/public/articleListData').get(postController.articleListData)
	app.route('/public/articleDetailData').post(postController.articleDetailData)
	app.route('/member/memberInfoData').get(postController.ensureAuthorized,postController.memberInfoData)
	app.route('/member/settleMentData').post(postController.ensureAuthorized,postController.settleMentData)
	app.route('/member/ModifyPass').post(postController.ensureAuthorized,postController.ModifyPass)
	app.route('/admin/Article').post(postController.ensureAdminAuthorized,postController.Article)
	app.route('/admin/deleteArticle').post(postController.ensureAdminAuthorized,postController.deleteArticle)
	app.route('/admin/setDegree').post(postController.ensureAdminAuthorized,postController.setDegree)
	app.route('/admin/memberInfoList').get(postController.ensureAdminAuthorized,postController.memberInfoList)
	app.get('/download',function(req,res,next){
	  var fileurl = path.resolve(__dirname, '../downloads/'+req.query.file)
	  res.download(fileurl,req.query.file);
	});
	app.get('*', function (request, response){
	  response.sendFile(path.resolve(__dirname, '../../www/', 'index.html'))
	})
}
