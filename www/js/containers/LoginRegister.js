import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Login extends Component {
  render() {
    return (
            <div>
            <Link to="/login" className="btn btn-primary">
              登录
            </Link>
            &nbsp;
            <Link to="/register" className="btn btn-primary">
              立即注册
            </Link>
      </div>
    )
  }   
}

