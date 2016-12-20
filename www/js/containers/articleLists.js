  import React, { Component, PropTypes } from 'react'
  import {articleListDataQuote}  from '../actions/fetchDataQuote';
  import {connect} from 'react-redux';
  import TableBox from './components/TableBox'
  import {IndexLink} from 'react-router'
import {asyncConnect} from 'redux-async-connect'

  const noticeHeader = [
  {key:'type',value:'类型'},
  {key:'title',value:'标题'},
  {key:'updatedAt',value:'最后修改时间'}
  ]

  @asyncConnect([{
    promise: ({store: {dispatch, getState}}) => {
      const promises = [];

      if (!getState().articleListDataQuotes.isloaded) {
        promises.push(dispatch(articleListDataQuote('public/articleListData')));
      }

      return Promise.all(promises);
    }
  }])
  
  @connect(
    state => ({
      Tips:state.Tips,
      articleListData:state.articleListDataQuotes.articleListData,
      }),
    {}
  )

  export default class Home extends Component{

      render() {
      // console.log(this.props.articleListData)
      return ( <div>
            <ol className="breadcrumb">
              <li><IndexLink to="/">主页</IndexLink></li>
              <li><a className="active">历史公告信息</a></li>
            </ol>
            <TableBox tableHeader = { noticeHeader }
              data = { this.props.articleListData } />
          </div>
      )
    }

  }
