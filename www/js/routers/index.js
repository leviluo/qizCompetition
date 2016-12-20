import React from 'react'
import { Router, Route,browserHistory,hashHistory, IndexRoute } from 'react-router'
// import {requireAuthentication} from '../containers/AuthenticatedComponent';


const getIndex = (nextState, cb) => {
    require.ensure([], require => {
       var target = require('../containers/Index')
       cb(null, target.default)
    },'index')
}

const getHome = (nextState, cb) => {
    require.ensure([], require => {
        var target = require('../containers/Home')
        cb(null, target.default)
    },'home')
}

const getfundDetails = (nextState, cb) => {
    require.ensure([], require => {
        var target = require('../containers/fundDetails')
        cb(null, target.default)
    },'fundDetails')
}

const getarticleLists = (nextState, cb) => {
    require.ensure([], require => {
       var target = require('../containers/articleLists')
       cb(null, target.default)
    },'articleLists')
}

const getarticleDetail = (nextState, cb) => {
    require.ensure([], require => {
        var target = require('../containers/articleDetail')
        cb(null, target.default)
    },'articleDetail')
}

const getmemberCenter = (nextState, cb) => {
    require.ensure([], require => {
        var target = require('../containers/memberCenter')
        cb(null, target.default)
    },'memberCenter')
}

const getadminCenter = (nextState, cb) => {
    require.ensure([], require => {
        var target = require('../containers/adminCenter')
        cb(null, target.default)
    },'adminCenter')
}

const getdownload = (nextState, cb) => {
    require.ensure([], require => {
        var target = require('../containers/download')
        cb(null, target.default)
    },'download')
}

const getLogin = (nextState, cb) => {
    require.ensure([], require => {
        var target = require('../containers/Login')
        cb(null, target.default)
    },'login')
}

const getRegister = (nextState, cb) => {
    require.ensure([], require => {
        var target = require('../containers/register')
        cb(null, target.default)
    },'register')
}

const requireAdmin = (nextState, replace, next) => {
    if (localStorage.getItem('id_token') && (localStorage.getItem("role")==1)) {
        next()
        return
    }
    replace({ pathname: '/login' })
    next()
}

const requireUser = (nextState, replace, next) => {
    if (localStorage.getItem('id_token') && (localStorage.getItem("role")==0)) {
        next()
        return
    }
    replace({ pathname: '/login' })
    next()
}
import { ReduxAsyncConnect, asyncConnect, reducer as reduxAsyncConnect } from 'redux-async-connect'
const Routers = (
  <Router history={hashHistory} render={(props) => <ReduxAsyncConnect {...props}/>}>
    <Route path="/" getComponent={getIndex}>
      <IndexRoute getComponent={getHome}/>
      <Route path="/home" getComponent={getHome}/>
      <Route path="/fundDetails/:type" getComponent={getfundDetails}/>
      <Route path="/articleLists" getComponent={getarticleLists} />
      <Route path = "/articleDetail/:id" getComponent = {getarticleDetail}/>
      <Route path="/memberCenter" getComponent={getmemberCenter} onEnter={requireUser}/>
      <Route path="/adminCenter" getComponent={getadminCenter} onEnter={requireAdmin}/>
      <Route path="/download" getComponent={getdownload}/>
      <Route path="/login" getComponent={getLogin}/>
      <Route path="/register" getComponent={getRegister}/>
    </Route>
  </Router>
  )




// import Index from '../containers/Index'
// import Home from '../containers/Home'
// import memberCenter from '../containers/memberCenter'
// import adminCenter from '../containers/adminCenter'
// import fundDetails from '../containers/fundDetails'
// import articleLists from '../containers/articleLists'
// import articleDetail from '../containers/articleDetail'

// const Routers = (
//   <Router history={hashHistory}>
//     <Route path="/" component={Index}>
//       <IndexRoute component={Home}/>
//       <Route path="/home" component={Home}/>
//       <Route path="/fundDetails" component={fundDetails}/>
//       <Route path="/articleLists" component={articleLists} />
//       <Route path = "/articleDetail/:id" component = {articleDetail}/>
//       <Route path="/memberCenter" component={requireAuthentication(memberCenter)}/>
//       <Route path="/adminCenter" component={requireAuthentication(adminCenter)}/>
//       <Route path="/:id" component={Home}/>
//     </Route>
//   </Router>
//   )

export default Routers;
