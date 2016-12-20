import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,LOGOUT_REQUEST,tips_START} from '../constants' 
import { hashHistory } from 'react-router'

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token,
    role:user.role,
  }
}

function loginError(message) {
  return {
    type: tips_START,
    response: message
  }
}

export function loginUser(creds) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body:JSON.stringify({
                "phone":creds.operid,
                "password":creds.password
    })
  }

  return dispatch => {
    // dispatch 请求开始状态
    dispatch(requestLogin(creds))

    return fetch('public/login', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.ok) {
          // dispatch 错误状态
          dispatch(loginError(user.message))
          return Promise.reject(user)
        } else {
           if (user.id==0) {
          // 登录成功后，将token存到local storage中，当然也可以放至session storage中
            localStorage.setItem('id_token', user.token)
            localStorage.setItem('role', user.role)
            // localStorage.setItem('nickName', user.nickName)
            localStorage.setItem('account', creds.operid)
          // dispatch 成功状态
             dispatch(receiveLogin(user))
             if (user.role==0) {
             hashHistory.push('memberCenter')
             } else{
             hashHistory.push('adminCenter')
             }
            }else{
            dispatch(loginError(user.msg))
            // alert(user.msg)
            }
        }
      }).catch(err => console.log("Error: ", err))
  }
}

// 对应退出过程的三种状态，我们可以调用api到后台通知用户退出，这里我们只是把用户`isAuthenticated` 设为false并把token从localStorage中移除。

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

// 退出方法
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    // localStorage.removeItem('nickName')
    localStorage.removeItem('account')
    localStorage.removeItem('role')
    dispatch(receiveLogout())
    hashHistory.push('/')
  } 
}

