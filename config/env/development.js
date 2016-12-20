module.exports = {
	port: 50000,
	// mongodb: 'mongodb://localhost/phonegap_demo',
	mysqldb:'mysql://root:19891201luo@localhost/competition_sub', 
	JWT_SECRET: 'leviluo',
	MainAddr:'139.196.18.4:15646', //配置登录，注册，结算单地址
	preliminaryContestAddr:'139.196.56.254:15809', //配置初赛的资金查询
	intermediaryContestAddr:'139.196.56.254:15809', //配置复赛的资金查询
	registerIsAccountName:"account" //"account"表示accountname为原始Account,"phone"表示accountname为phone
}