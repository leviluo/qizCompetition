import React, { Component, PropTypes } from 'react'
import ModalBox from './Modal'
import InputBox from './InputBox'
import { operateDataQuote } from '../../actions/fetchDataQuote';
import { connect } from 'react-redux';

@connect(
  state => ({
    Tips:state.Tips,
    }),
  {operateDataQuote}
)

export default class ModifyPass extends Component {

	state = {
		open:false
	}

	// oldpasswordChange = (e)=>{
	// 	this.setState({
	// 		oldpassword:e.target.value
	// 	})
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
    return (
    	<div className="pull-left">
      <button className="btn btn-primary" onClick={this.modify} style={{margin:'8px',float:'right'}}>修改密码</button>
      <ModalBox open = { this.state.open }
            content = { this.state.content }
            head = { this.state.head }
            submitData = { this.submitData }
       />
    	</div>
    )
  }

}

