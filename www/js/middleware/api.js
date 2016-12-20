// 公共调用接口
import "whatwg-fetch"
// import {ES6Promise} from "es6-promise"

// console.log(ES6Promise)

import ES6Promise from 'es6-promise';

ES6Promise.polyfill();

export function callApi(endpoint,authenticated,body) {

  let token = localStorage.getItem('id_token') || null
  let config = {}

  // if(authenticated) {
    // console.log(body)
    // if(token) {

      if (body) {
        config = {
        headers: { 
          'Authorization': `${token}` ,
          'Content-Type':'application/json',
        },
        method:"POST",
        body:JSON.stringify(body)
        }
      } else{
        config = {
        headers: { 'Authorization': `${token}` },
      }
    // }

    // }
    // else {
    //   alert("No token saved!")
    //   throw "No token saved!"
    // }
  }

  return fetch(endpoint, config)
    .then(response => 
      response.json().then(text => ({ text, response }))
    ).then(({ text, response }) => {
      if (!response.ok) {
        return Promise.reject(text)
      }
      return text
    }).catch(err => console.log(err))
}

export default store => next => action => {

  const callAPI = action

  // 使中间件不会应用到没有CALL_API的action
  if (typeof callAPI.types === 'undefined') {
    return next(action)
  }

  let { endpoint, types, authenticated,body,mytype,time } = callAPI

  const [ requestType, successType, errorType ] = types

  // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes
  return callApi(endpoint, authenticated,body,mytype,time).then(
    response => next({response,authenticated,type: successType,mytype:mytype,time:time}),
  ).catch(error => next({message: '登录过期或登录发生错误,请重新登陆',type:'LOGIN_FAILURE'}))
}
