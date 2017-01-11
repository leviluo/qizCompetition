import React, { Component, PropTypes } from 'react'
import {articleDetailDataQuote}  from '../actions/fetchDataQuote'
import {connect} from 'react-redux'
import {Link,IndexLink} from 'react-router'

@connect(
  state => ({
    Tips:state.Tips,
    articleDetailData:state.articleDetailDataQuotes.articleDetailData,
    }),
  {articleDetailDataQuote}
)

export default class Home extends Component{

    componentWillMount = () => {
        let id = this.props.params.id;

        this.props.articleDetailDataQuote('/public/articleDetailData',{id:id})
        if(!this.props.articleDetailData.updatedAt)return
    }

    componentDidUpdate = () => {
        if (this.props.articleDetailData.content) {
          document.getElementById('content').innerHTML = this.props.articleDetailData.content
        };
    }



    render() {
      if(!this.props.articleDetailData)return <div></div>
      if (this.props.articleDetailData.type == 0) {
        var type = "公告"
      }else{
        var type = "规则"
      }
       // console.log(this.props)
    return ( < div style={{background:"#fff"}}>
          <ol className="breadcrumb">
            <li><IndexLink to="/">主页</IndexLink></li>
            <li><Link to="/articleLists">历史公告信息</Link></li>
            <li><a className="active">公告详情</a></li>
          </ol>
            <table className="table">
            <tbody>
                <tr>
                  <td>类型:</td>
                  <td>{type}</td>
                </tr>
                <tr>
                  <td>标题:</td>
                  <td><strong>{this.props.articleDetailData.title}</strong></td>
                </tr>
                <tr>
                  <td>最后修改时间:</td>
                  <td>{this.props.articleDetailData.updatedAt.substr(0,10)}</td>
                </tr>
                <tr>
                  <td id="content" colSpan="2" style={{wordWrap:"break-word",wordBreak:"break-all"}}></td>
                </tr></tbody>
              </table>
        < /div>
    )
  }
}
