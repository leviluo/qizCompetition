var waterline = require('waterline');

var user = waterline.Collection.extend({
  identity: 'user',
  connection: 'mysql',
  schema: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
        userinfo: {
            collection: "userinfo",
        },
        userid: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            defaultsTo: ''
        },
        role:{
           type: 'integer',
           defaultsTo: 0
        },
        reg_time:'date'
   }
})

var article = waterline.Collection.extend({
  identity: 'article',
  connection: 'mysql',
  schema: true,
  attributes: {
        title: {
            type: 'string',
            required: true
        },
        type: {
            type: 'integer',
            required: true
        },
        content: {
            type: 'string',
            required: true
        },
        createdAt:'date',
        updatedAt:'date'
   }
}
)

var referrer = waterline.Collection.extend({
  identity: 'referrer',
  connection: 'mysql',
  schema: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
        referrerid: {
            type: 'string',
            required: true
        },
        recommendedid: {
            type: 'string',
            required: true
        },
   }
}
)

var userInfo = waterline.Collection.extend({
  identity: 'userinfo',
  connection: 'mysql',
  schema: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
        userid: {
            model: 'user',
            var:"userinfo"
        },
        identitycard: {
            type: 'string',
            required: true
        },
        name: {
            type: 'string',
            // required: true
        },
   }
}
)

module.exports = [article,user,referrer,userInfo]
