import React, { Component, PropTypes } from 'react'

export default class Download extends Component{

    render() {
    return ( < div style={{textAlign:"center",marginTop:"30px"}}>
                  <a href="/download?file=qizTradeSingle.rar" className="btn btn-success" style={{marginLeft:"10px"}}>下载PC交易端</a>
                  <a href="/download?file=qizTrade.ipa" className="btn btn-success" style={{marginLeft:"10px"}}>IOS</a>
                  <a href="/download?file=qizTrade.apk" className="btn btn-success" style={{marginLeft:"10px"}}>Android</a>
        < /div>
    )
  }
}
