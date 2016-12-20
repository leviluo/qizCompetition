var waterline = require('waterline')
var mysqlAdapter = require('sails-mysql')
var config = require('./config')
var post = require('../app/models/post.server.model')

var wlconfig = {
	adapters:{
		mysql:mysqlAdapter,
		default:'mysql'
	},
	connections:{
		mysql:{
			adapter:'mysql',
			host : 'localhost',
			port : 3306,
			user : 'root',
			password : '19891201luo',
			database : 'qiz_sub'
		}
	},
	defaults: {
        migrate: 'safe' //这个注意啊，如果是争对已经有的数据库一定要注意，小心把表全删除了
    }
}

	var orm = new waterline();
for (var i = 0; i < post.length; i++) {
	orm.loadCollection(post[i])
};
exports.wlconfig = wlconfig;
exports.orm = orm;
