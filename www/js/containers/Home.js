import React, { Component, PropTypes } from 'react'
import { openTips,preliminaryContestDataQuote,intermediaryContestDataQuote,articleListDataQuote} from '../actions/fetchDataQuote'
import {connect} from 'react-redux';
import TableBox from './components/TableBox'
import { Link } from 'react-router'
import {asyncConnect} from 'redux-async-connect'

const tableHeader = [
{key:'rank',value:'排名'},
{key:'1',value:'用户'},
{key:'3',value:'权益'},
{key:'11',value:'净利润'},
{key:'14',value:'收益率'},
]

const noticeHeader = [
{key:'type',value:''},
{key:'title',value:''},
{key:'updatedAt',value:''}
]

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!getState().articleListDataQuotes.isloaded) {
      promises.push(dispatch(articleListDataQuote('public/articleListData')));
    }
    if (!getState().intermediaryContestDataQuotes.isloaded) {
      promises.push(dispatch(intermediaryContestDataQuote('public/intermediaryContestData')));
    }
    if (!getState().preliminaryContestDataQuotes.isloaded) {
      promises.push(dispatch(preliminaryContestDataQuote('public/preliminaryContestData')));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    Tips:state.Tips,
    preliminaryContestData:state.preliminaryContestDataQuotes.preliminaryContestData,
    intermediaryContestData:state.intermediaryContestDataQuotes.intermediaryContestData,
    articleListData:state.articleListDataQuotes.articleListData,
    }),
  {openTips}
)
export default class Home extends Component{

    componentWillMount = () => {

    }
  
    render() {
    const styles = require('./home.scss');
    return ( < div className = { styles.homeContent } >
        < div className = "pull-left" >
        <div>
          <h4><i className="fa fa-arrow-up"></i>&nbsp;初赛排行<Link to="/fundDetails/preliminary" >查看更多&gt;&gt;</Link></h4>
           < TableBox tableHeader = { tableHeader }
            data = { this.props.preliminaryContestData } 
            PageNavBar = "false"
            /> 
        </div>
        <div>
          <h4><i className="fa fa-arrow-up"></i>&nbsp;复赛排行<Link to="/fundDetails/intermediary" >查看更多&gt;&gt;</Link></h4>
           < TableBox tableHeader = { tableHeader }
            data = { this.props.intermediaryContestData } 
            PageNavBar = "false"/> 
        </div>
        < /div> < div className = "pull-right" >
        < div >
        < h4 ><i className="fa fa-newspaper-o"></i>&nbsp;公告<Link to="/articleLists" >查看更多&gt;&gt;</Link>< /h4> < TableBox tableHeader = { noticeHeader }
            data = { this.props.articleListData } 
            PageNavBar = "false"/>  < /div> 
        < div >
        <h4><i className="fa fa-address-book"></i>&nbsp;服务 </h4> 
        <div>
        <table className="table table-hover">
        <tbody>
        <tr>
          <td colSpan="2"><strong>联系我们</strong></td>
        </tr>
          <tr>
            <td><i className="fa fa-qq"></i>&nbsp;</td>
            <td><b>{config.qq}</b></td>
          </tr>
          <tr>
            <td><i className="fa fa-phone"></i>&nbsp;</td>
            <td><b>{config.phone}</b></td>
          </tr>
          <tr>
            <td colSpan="2"><img width="150" src='../../img/qrcode.jpg' alt=""/><br/><p style={{color:"red"}}>欢迎关注“锦世翔资产”微信公众号</p></td>
          </tr>
        </tbody>
        </table>
        </div>< /div> < /div> < /div>
    )
  }
}
