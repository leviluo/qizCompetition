var http = require('http')
var superagent = require('superagent');
var jwt = require('jsonwebtoken');
var config = require('../../config/config');
// var Q = require('Q')

module.exports = {
    login: function(req, res, next) {
        if (!req.body.phone || !req.body.password) {
            return next(new Error("params error"));
        };
        req.models.user.findOne({ userid: req.body.phone, role: 1 }, function(err, docs) {
            if (err) { next(err) };
            var expires = Date.parse(new Date()) + 604800;
            var profile = {
                user: req.body.phone,
                exp: expires
            };
            if (docs) {
                if (docs.userid != req.body.phone || docs.password != req.body.password) {
                    return res.json({ id: '-1', msg: '用户或密码错误' })
                }
                profile.role = 1;
                var token = jwt.sign(profile, config.JWT_SECRET);
                return res.json({ id: 0, role: 1, token: token });

            } else { //如果不是admin则转发到后台继续验证
                superagent.post(config.MainAddr + '/managerapi/checkAccountValid')
                    .type("form")
                    .send({ account: req.body.phone, password: req.body.password }).end(function(err, ress) {
                        if (err) { next(err) };
                        if (ress) {
                            if (ress.body.id == 0) {
                                profile.role = 0;
                                var token = jwt.sign(profile, config.JWT_SECRET);
                                res.json({ id: 0, role: 0, token: token });
                            } else {
                                res.json({ id: -1, msg: ress.body.message });
                            }
                        };
                    })
            }
        })
    },
    register: function(req, res, next) {



        if (!req.body.phone || !req.body.password || !req.body.identification) {
            return res.json({ 'id': -13, 'msg': '缺少参数' });
        };

        req.models.userinfo.findOne({ identitycard: req.body.identification }, function(err, docs) {
                if (err) {next(err)};
                    console.log("000000")
                if (docs) {
                    console.log("111111")
                    return res.json({ 'id': -12, 'msg': '身份证号重复' });
                } else {
                    superagent.post(config.MainAddr + '/managerapi/getReservedAccount')
                        .end(function(err, ress) {
                            if (err) {
                                return next(err)
                            }
                            if (ress.ok) {
                                if (!ress.body.account) {
                                    return res.json({ id: '-2', msg: "没有可用账户" })
                                }
                                
                                if (config.registerIsAccountName == "account") {
                                    var items = { account: ress.body.account, newaccount: req.body.phone, password: req.body.password,accountname:ress.body.account}
                                } else if(config.registerIsAccountName == "phone"){
                                    var items = { account: ress.body.account, newaccount: req.body.phone, password: req.body.password,accountname:req.body.phone}    
                                }
                                
                                superagent.post(config.MainAddr + '/futuresapi/reqAccountRename')
                                    .type("form")
                                    .send(items).end(function(err, resss) {
                                        if (err) {
                                            return next(err)
                                        }
                                        
                                        if (resss.ok) {
                                            if (resss.body.id == 0) {
                                                
                                                if(req.body.referrer){
                                                   
                                                    req.models.referrer.create({referrerid:req.body.referrer,recommendedid:req.body.phone},function(err,doc){
                                                        if (err) return next(err)
                                                    })
                                                }
                                               
                                                req.models.user.create({ userid: req.body.phone}, function(err, doc) {
                                                    if (err) return next(err)
                                                        if (doc) {
                                                            req.models.userinfo.create({ userid:doc.id, identitycard: req.body.identification,name:req.body.name }, function(err, doc) {
                                                                if (err) return next(err)
                                                                return res.json({ id: 0, msg: '注册成功！ 您可用刚刚注册的手机号码和密码在网页交易、微信交易或下载交易端进行交易。' })
                                                            }) 
                                                        };
                                                })
                                            } else {
                                                return res.json(resss.body);
                                            }
                                        } else {
                                            return res.json({ 'id': -12, 'msg': '服务器连接错误' });
                                        }
                                    })
                            } else {
                                return res.json({ 'id': -12, 'msg': '服务器连接错误' });
                            }
                        });
                }
        });
    },

    preliminaryContestData: function(req, res, next) {
        
        superagent.post(config.preliminaryContestAddr + '/qiasapi/queryFundDetailLast')
            .type("form")
            .send({ orderType: 3, pageIndex: 1, positive: 0,flag: 0 }).end(function(err, ress) {
                // console.log(err)
                if (err) {
                    return next(err)
                }
                if (ress.ok) {
                    // console.log(ress.body)
                    if (ress.body.data) {  
                    return res.json(ress.body.data)
                    }else{
                    return res.json(ress.body); 
                    }
                };
            })
    },

    intermediaryContestData: function(req, res, next) {
        superagent.post(config.intermediaryContestAddr + '/qiasapi/queryFundDetailLast')
        .type("form")
        .send({ orderType: 3, pageIndex: 1, positive: 0,flag: 1 }).end(function(err, ress) {
                if (err) {
                    return next(err)
                }
                if (ress.ok) {
                    if (ress.body.data) {  
                    return res.json(ress.body.data)
                    }else{
                    return res.json(ress.body); 
                    }
                };
            })
    },

    settleMentData: function(req, res, next) {

        superagent.post(config.MainAddr + '/managerapi/querySettlementContent')
            .type("form")
            .send({ account: req.body.user, date: req.body.date }).end(function(err, ress) {
                if (err) {
                    if (err.rawResponse) {
                        return res.json({ data: err.rawResponse })
                    } else {
                        return next(err)
                    }
                }
                if (ress.ok) {
                    return res.json(ress.body)
                };
            })
    },

    setDegree:function(req,res,next) {
        if (!req.body.account || req.body.flag === '' ) {
            return res.json({ 'id': -13, 'msg': '缺少参数' });
        };

        superagent.post(config.MainAddr + '/managerapi/reqQryAccountFlag').type("form").send({ account: req.body.account}).end(function(err, ress){

                if( ress.body.flag==undefined){
                    return res.json({id:-1,msg:"账户不存在"})
                }
                
                if(ress.body.flag === req.body.flag){
                    return res.json({id:-1,msg:"重复设置"})
                }

                superagent.post(config.MainAddr + '/managerapi/reqSetAccountFlag')
                    .type("form")
                    .send({ account: req.body.account, accountFlag: req.body.flag }).end(function(err, resss) {
                        if (err) {
                            if (err.rawResponse) {
                                return res.json({ data: err.rawResponse })
                            } else {
                                return next(err)
                            }
                        }
                        if (resss.ok) {
                            if(resss.body.id==0){
                            return res.json({id:0,msg:"成功"})
                            }else{
                            return res.json({id:-1,msg:resss.body.message})
                            }
                        };
                })

         })
    },

    memberInfoData: function(req, res, next) {
        req.models.user.findOne({ userid: req.body.user }, function(err, docs) {
            if (err) {
                return next(err)
            }
            if (docs) {
                // return res.json({ nickName: docs.nickName });
            };
        })
    },

    ensureAuthorized: function(req, res, next) {
        var bearerHeader = req.headers["authorization"];
        if (bearerHeader) {
            reqq = jwt.decode(bearerHeader, config.JWT_SECRET);
            if (!reqq.user || reqq.role != 0) {
                return res.json({ "id": "-10", "msg": "用户不合法" });
            }
			req.body.user = reqq.user;
			next();
        } else {
            res.send(403);
        }
    },

    ensureAdminAuthorized: function(req, res, next) {
        var bearerHeader = req.headers["authorization"];
        if (bearerHeader) {
            reqq = jwt.decode(bearerHeader, config.JWT_SECRET);
            req.models.user.findOne({ userid: reqq.user, role: 1 }, function(err, docs) {
                if (err) {
                    return next(err)
                }
                if (docs) {
                    next();
                } else {
                    return res.json({ "id": "-10", "msg": "不存在此用户" });
                }
            })

        } else {
            res.send(403);
        }
    },

    ModifyPass: function(req, res, next) {
        superagent.get(config.MainAddr + '/managerapi/checkSystemTradingStatus').end(function(err, ress) {
                if (err) {
                    return next(err)
                }
                if (ress.ok) {
                    // console.log(ress.body)
                    if (ress.body) {
                        var url = config.MainAddr + "/futuresapi/reqAccountResetPassword"
                    } else {
                        var url = config.MainAddr + "/managerapi/reqAccountResetPassword"
                    }
                    superagent.post(url)
                        .type("form")
                        .send({ account: req.body.user, password: req.body.newpassword }).end(function(err, resss) {
                            if (err) {
                                return next(err)
                            }
                            // console.log(resss.body)
                            if (resss.ok) {
                                if (resss.body.id == 0) {
                                    return res.json({ id: 0, msg: "修改成功" });
                                } else {
                                    return res.json(resss.body)
                                }
                            };
                        })
                };
            })
    },

    Article: function(req, res, next) {
        // console.log(req.body)
        if (req.body.articletype == undefined || !req.body.title || !req.body.type || !req.body.content) {
            return res.json({ 'id': -13, 'msg': '缺少参数' });
        };
        if (req.body.type == 'add') {
            req.models.article.create({ title: req.body.title, type: req.body.articletype, content: req.body.content }, function(err, doc) {
                if (err) return next(err)
                return res.json({ id: 0, msg: '发布成功' })
            })
        } else if (req.body.type == 'modify') {
            req.models.article.update({ id: req.body.id }, { title: req.body.title, type: req.body.articletype, content: req.body.content })
                .exec(function(err, doc) {
                    if (err) return next(err)
                    return res.json({ id: 0, msg: '修改成功' })
                })
        }
    },

    deleteArticle: function(req, res, next) {
        if (!req.body.id || req.body.id.length == 0) {
            return res.json({ id: -1, msg: "缺少参数" })
        }
        req.models.article.destroy({ id: req.body.id }).exec(function(err, docs) {
            if (err) { next(err) };
            if (docs) {
                return res.json({ id: 0, msg: '删除成功' })
            }
        })
    },

    articleListData: function(req, res, next) {
        req.models.article.find({ sort: 'type DESC' })
            .exec(function(err, docs) {
                if (err) { next(err) };
                if (docs) {
                    var items = []
                    for (var i = 0; i < docs.length; i++) {
                        var obj = {}
                        obj.id = docs[i].id
                        obj.title = docs[i].title
                        obj.type = docs[i].type
                        obj.updatedAt = docs[i].updatedAt
                        items.push(obj)
                    };
                    return res.json(items)
                };
            })
    },

    articleDetailData: function(req, res, next) {
        req.models.article.findOne({ id: req.body.id }, function(err, docs) {
            if (err) { next(err) };
            if (docs) {
                res.json(docs)
            }
        })
    },

    memberInfoList:function(req,res,next){
        req.models.userinfo.query('select userinfo.*,user.userid,user.reg_time,referrer.referrerid from userinfo left join user on user.id = userinfo.userid left join referrer on referrer.recommendedid = user.userid order by user.id',[],function(err, docs) {
            if (err) { next(err) };
            if (docs) {
                res.json(docs)
            }
        })
    }
}
