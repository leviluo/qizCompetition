import React, { Component, PropTypes } from 'react'
import ModalBox from './Modal'
import InputBox from './InputBox'
import TextareaBox from './TextareaBox'
import { registerQuote } from '../../actions/fetchDataQuote';
import { connect } from 'react-redux';

@connect(
  state => ({
    }),
  {registerQuote}
)
export default class Login extends Component {

  state = {
    open:false,
    referrer:''
  }

  phoneChange = (e)=>{
    this.setState({
      phone:e.target.value
    })
  }

  passwordChange = (e)=>{
    this.setState({
      password:e.target.value
    })
  }

  nickNameChange = (e)=>{
    this.setState({
      nickName:e.target.value
    })
  }

  identifiedChange = (e)=>{
    this.setState({
      identification:e.target.value
    })
  }

  referrerChange = (e)=>{
    this.setState({
      referrer:e.target.value
    })
  }

  protocolChange = (e)=>{
    this.setState({
      protocol:e.target.value
    })
  }

  registerModal = () =>{
    this.setState({
      open: this.state.open ? false : true,
      content:(
        <form>
          <InputBox header = '手机号' indeed={true} handleSelect = {this.phoneChange} />
          <InputBox header = '密码' indeed={true} handleSelect = {this.passwordChange} />
          <InputBox header = '昵称' indeed={true} handleSelect = {this.nickNameChange} />
          <InputBox header = '身份证号' indeed={true} handleSelect = {this.identifiedChange} />
          <InputBox header = '推荐人' handleSelect = {this.referrerChange} />
          <div style={{height:'200px',overflowY:'scroll'}}><h4 style={{textAlign:'center'}}>保密协议</h4>甲方：锦世翔资产<br />
          乙方：<br />
          <br />
          鉴于：<br />
          甲乙双方正在进行 锦世翔期货大师赛 （以下简称“大师赛”）；双方就该“大师赛”的实施以及合作过程中，向对方提供有关保密信息，且该保密信息属提供方合法所有；<br />
          甲乙双方均希望对本协议所述保密信息予以有效保护，经双方协商，达成本协议。<br />
          <br />
          一、本协议所指保密信息是指：<br />
          1、甲方向乙方提供： <br />
          在合作过程中，乙方从甲方（或子公司、关联公司）获得的与合作有关或因合作产生的任何商业、营销、技术、运营数据或其他性质的资料，无论以何种形式或载于何种载体，<br />
          无论在披露时是否以口头、图像或以书面方式表明其具有保密性。<br />
          2、乙方向甲方提供：<br />
          在合作过程中，甲方从乙方（或其母公司、子公司、关联公司）获得的与合作有关或因合作产生的任何个人信息或其他性质的资料，无论以何种形式或载于何种载体，无论在<br />
          披露时是否以口头、图像或以书面方式表明其具有保密性。<br />
          上述保密信息可以以数据、文字及记载上述内容的资料、光盘、软件、图书等有形媒介体现，也可通过口头等视听形式传递。<br />
          <br />
          二、双方权利与义务<br />
          1.双方保证该保密信息仅用于与合作有关的用途或目的。<br />
          2.双方各自保证对对方所提供的保密信息予以妥善保存。<br />
          3.双方各自保证对对方所提供的保密信息按本协议约定予以保密，并至少采取适用于对自己的保密信息同样的保护措施和审慎程度进行保密。　<br />
          4.双方保证保密信息仅可在各自一方从事该“大师赛”研究的负责人和雇员范围内知悉。在双方上述人员知悉该保密信息前，应向其提示保密信息的保密性和应承担的义务，<br />
          并保证上述人员以书面形式同意接受本协议条款的约束，确保上述人员承担保密责任的程度不低于本协议规定的程度。<br />
          <br />
          三、违约与赔偿<br />
          任何一方违反本协议的规定，应在第一时间采取一切必要措施防止保密信息的扩散，尽最大可能消除影响，并应承担违约责任，具体责任由双方协商确定。<br />
          <br />
          四、有效期：本协议自签订之日起生效，并持续有效，双方协商一致可终止协议。双方合作“大师赛”的终止并不影响和协议的效力。<br />
          <br />
          五、任何通过友好协商后不能解决的争议均应提交协议签订地人民法院诉讼解决。
          </div><br/>
          <label>同意:&nbsp;<input type="radio" onChange={this.protocolChange} /></label>
        </form>
        )
    })
  }

  submitData = ()=>{

          if (!this.state.phone) {
              this.props.openTips('未填写手机号')
              return;
          }
          if (!this.state.password) {
              this.props.openTips('未填写密码')
              return;
          }
          if (!this.state.nickName) {
              this.props.openTips('未填写昵称')
              return;
          }
          if (!this.state.identification) {
              this.props.openTips('未填写身份证号')
              return;
          }
          if (!this.state.protocol) {
              this.props.openTips('没有同意保密协议')
              return;
          }

          let body = {
            phone:this.state.phone,
            password:this.state.password,
            nickName:this.state.nickName,
            identification:this.state.identification,
            referrer:this.state.referrer,
          }
          this.setState({ 
              open: this.state.open ? false : true,
          })  

          this.props.registerQuote('public/register',body)
  }

  render() {
    const { errorMessage } = this.props
    return (
            <div>
            <div className="input-group" style={{marginRight:"10px"}}>
                <span className="input-group-addon">账户:</span>
                <input name="operid" type="text" className="form-control" ref='operid' placeholder="不能包含特殊字符" />
            </div>

            <div className="input-group" style={{marginRight:"10px"}}>
                <span className="input-group-addon">密码:</span>
                <input name="password" type="password" className="form-control" ref='password' placeholder="" />
            </div>
            <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
              登录
            </button>
            &nbsp;
            <button onClick={this.registerModal} className="btn btn-primary">
              立即注册
            </button>
            <ModalBox open = { this.state.open }
            content = { this.state.content }
            head = "新用户注册"
            submitData = { this.submitData }
            />
      </div>
    )
  }

  handleClick(event) {
    const operid = this.refs.operid
    const password = this.refs.password
    const creds = { operid: operid.value.trim(), password: password.value.trim() }
    if (!creds.operid) {
          this.props.openTips('未填写用户')
          return;
    }
    if (!creds.password) {
              this.props.openTips('未填写密码')
              return;
    }
    this.props.onLoginClick(creds)
  }     
}

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}