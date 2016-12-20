// components/Logout.js

import React, { Component, PropTypes } from 'react'

export default class Logout extends Component {

  render() {
    const { onLogoutClick } = this.props
    const account = localStorage.getItem('account') 
    return (
    	<div style={{marginTop:'8px',float:'right'}}>{account}&nbsp;
      <button onClick={() => onLogoutClick()} className="btn btn-primary">
        退出
      </button>
    	</div>
    )
  }

}

Logout.propTypes = {
  onLogoutClick: PropTypes.func.isRequired
}