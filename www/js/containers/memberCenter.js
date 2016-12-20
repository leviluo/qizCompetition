import React, { Component, PropTypes } from 'react'
import InputBox from './components/InputBox'
import RadioBox from './components/RadioBox'
import ModalBox from './components/Modal'
import {connect} from 'react-redux'
import {openTips,settleMentDataQuote,memberInfoDataQuote,operateDataQuote} from '../actions/fetchDataQuote';

const items = document.getElementsByName('ulNav');
const styles = require('./memberCenter.scss')

@connect(
  state => ({
    Tips:state.Tips,
    memberInfoData:state.memberInfoDataQuotes.memberInfoData,
    settleMentData:state.settleMentDataQuotes.settleMentData
    }),
  {openTips,settleMentDataQuote,memberInfoDataQuote,operateDataQuote}
)


export default class memberCenter extends Component{

            state = {
              view:'memberInfo',
              open:false
            }

            componentWillMount = () => {
                // if (!this.props.memberInfoData) this.props.memberInfoDataQuote('member/memberInfoData')
            }
          
            changeViews = (e,target) =>{
            this.setState({
                view:target
            });

            for (var i = 0; i < items.length; i++) {
                items[i].style.background = 'none'
                items[i].style.color = '#333'
                items[i].style.border = 'none'
            };
            e.target.style.background = 'white';
            e.target.style.color = '#1874CD';
            e.target.style.borderLeft = '2px solid #1874CD';

            }

            searchSettleMent = () =>{
              console.log(this.refs)
              if (!this.refs.querydate.value) {
                this.props.openTips("未填写日期")
                return
              };
              this.props.settleMentDataQuote('member/settleMentData',{date:this.refs.querydate.value})
            }

            // oldpasswordChange = (e)=>{
            //  this.setState({
            //    oldpassword:e.target.value
            //  })
            // }

            newpasswordChange = (e)=>{
              this.setState({
                newpassword:e.target.value
              })
            }

            renewpasswordChange = (e)=>{
              this.setState({
                repassword:e.target.value
              })
            }

            modify = () =>{
              this.setState({
                open: this.state.open ? false : true,
                head:'修改密码',
                content:(
                  <form>
                    <InputBox header = '新密码' indeed={true} handleSelect = {this.newpasswordChange} />
                    <InputBox header = '重复新密码' indeed={true} handleSelect = {this.renewpasswordChange} />
                  </form>
                  )
              })
            }

            submitData = () => {
            // if (!this.state.oldpassword) {
            //     this.props.openTips('未填写旧密码')
            //     return;
            // }
            if (!this.state.newpassword) {
                this.props.openTips('未填写新密码')
                return;
            }
            if (this.state.repassword!=this.state.newpassword) {
                this.props.openTips('两次密码不相符')
                return;
            }

            let body = {
                oldpassword:this.state.oldpassword,
                newpassword:this.state.newpassword
            }


            this.setState({ 
              open: this.state.open ? false : true,
            })
            
            this.props.operateDataQuote('member/ModifyPass',body)
           }

            render() {
              // console.log(this.props)
              const account = localStorage.getItem('account') 
              // const nickName = localStorage.getItem('nickName') 
            return <div>
            <ul className={styles.rightul}>
                <li><a name="ulNav" onClick={(e)=>this.changeViews(e,'memberInfo')}>个人信息</a></li>
                <li><a name="ulNav" onClick={(e)=>this.changeViews(e,'deliveryOrder')}>历史交割单</a></li>
            </ul>
            <div className={styles.divright}>
            { this.state.view=='memberInfo' && <div>
              <table className="table table-hover"><tbody>
                <tr>
                  <td>账户:</td>
                  <td>{account}</td>
                </tr>
                <tr>
                  <td>修改密码:</td>
                  <td>
                  <button className="btn btn-primary" onClick={this.modify} style={{margin:'8px',float:'right'}}>修改密码</button>
                  <ModalBox open = { this.state.open }
                        content = { this.state.content }
                        head = { this.state.head }
                        submitData = { this.submitData }
                   /></td>
                </tr>
                <tr>
                  <td>排名:</td>
                  <td></td>
                </tr></tbody>
              </table>
            </div>}
            { this.state.view=='deliveryOrder' && <div>
            <input className="form-control" type="text" ref="querydate" placeholder="请输入查询日期(格式如20161009)"/>
            <div style={{textAlign:'center',margin:'10px 0'}}>
            <button className="btn btn-primary" onClick={this.searchSettleMent}>结算单</button>
            </div>
            {this.props.settleMentData && <pre>
            {this.props.settleMentData.message ? '当日没有结算单' :this.props.settleMentData.data}
            </pre>
            }
            </div>}

            </div>
            </div>;
          }
}

// SelectBox.PropTypes = {
//     items: React.PropTypes.array,
//     header: React.PropTypes.string,
//     defaultValue: React.PropTypes.string,
// }

