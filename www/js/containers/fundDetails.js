import React, { Component, PropTypes } from 'react'
import { openTips,preliminaryContestDataQuote,intermediaryContestDataQuote} from '../actions/fetchDataQuote';
import {connect} from 'react-redux';
import TableBox from './components/TableBox'
import {Link,IndexLink} from 'react-router'

const tableHeader = [
{key:'rank',value:'排名'},
{key:'1',value:'用户'},
{key:'3',value:'权益'},
{key:'11',value:'净利润'},
{key:'14',value:'收益率'},
]

@connect(
  state => ({
    Tips:state.Tips,
    preliminaryContestData:state.preliminaryContestDataQuotes.preliminaryContestData,
    intermediaryContestData:state.intermediaryContestDataQuotes.intermediaryContestData,
    }),
  {openTips,intermediaryContestDataQuote,preliminaryContestDataQuote}
)
export default class Home extends Component{

    componentWillMount = () => {
        this.type = this.props.params.type;
        if(this.type=="preliminary"){
          if (!this.props.preliminaryContestData) this.props.preliminaryContestDataQuote('public/preliminaryContestData')
        }else if (this.type=="intermediary") {
          if (!this.props.intermediaryContestData) this.props.intermediaryContestDataQuote('public/intermediaryContestData')
        };
    }
    render() {
      // console.log(this.props.preliminaryContestData)
      let data = (this.type=="preliminary") ? this.props.preliminaryContestData : this.props.intermediaryContestData;
      let header = (this.type=="preliminary") ? "初赛排行榜" : "复赛排行榜"
    return ( < div >
          <ol className="breadcrumb">
            <li><IndexLink to="/">主页</IndexLink></li>
            <li><a className="active">{header}</a></li>
          </ol>
          < TableBox tableHeader = { tableHeader }
            data = { data } 
            /> 
        < /div>
    )
  }
}
