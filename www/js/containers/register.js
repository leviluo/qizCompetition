import React, { Component, PropTypes } from 'react'
// import { Button  } from 'react-bootstrap';
import { openTips } from '../actions/fetchDataQuote'
import { connect } from 'react-redux'
import InputBox from './components/InputBox'
import TextareaBox from './components/TextareaBox'
import { registerQuote } from '../actions/fetchDataQuote';

@connect(
    state => ({
        Tips: state.Tips,
    }), { registerQuote, openTips }
)
export default class Register extends Component {
  state = {
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
      protocol:this.state.protocol ? false : true
    })
  }

  nameChange = (e)=>{
    this.setState({
      name:e.target.value
    })
  }

  handleClick =()=>{
    if (!this.state.phone) {
            this.props.openTips('未填写手机号')
            return;
        }

        var pattern = /^[1][34578][0-9]{9}$/;

        if (!pattern.test(this.state.phone)) {
            this.props.openTips('手机号格式不正确')
            return;
        };

        if (!this.state.password) {
            this.props.openTips('未填写密码')
            return;
        }
        // if (!this.state.nickName) {
        //     this.props.openTips('未填写昵称')
        //     return;
        // }
        if (!this.state.name) {
            this.props.openTips('没有填写姓名')
            return;
        }
        if (!this.state.identification) {
            this.props.openTips('未填写身份证号')
            return;
        }
        if(!this.checkIdCard(this.state.identification)){
          this.props.openTips('身份证号码不合法')
            return;
        }
        if (!this.state.protocol) {
            this.props.openTips('没有同意保密协议')
            return;
        }
        console.log(this.state.protocol)

        let body = {
          phone:this.state.phone,
          password:this.state.password,
          // nickName:this.state.nickName,
          identification:this.state.identification,
          referrer:this.state.referrer,
          name:this.state.name,
        }
        this.setState({ 
            open: this.state.open ? false : true,
        })  

        this.props.registerQuote('public/register',body)
  }

  checkIdCard = (num)=>{
    num = num.toUpperCase();
    var cityCode = {11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 "};
    if(!cityCode[num.substr(0,2)]){
      // alert("地址编码错误");
      return false;
    }
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
      //alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
      return false;
    }
    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    //下面分别分析出生日期和校验位
    var len, re;
    len = num.length;
    if (len == 15) {
      re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
      var arrSplit = num.match(re);
      //检查生日日期是否正确
      var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
      var bGoodDay;
      bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
      if (!bGoodDay) {
        //alert('输入的身份证号里出生日期不对！');
        return false;
      }
      else {
        //将15位身份证转成18位
        //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var nTemp = 0, k;
        num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
        for (k = 0; k < 17; k++) {
          nTemp += num.substr(k, 1) * arrInt[k];
        }
        num += arrCh[nTemp % 11];
        return true;
      }
    }
    if (len == 18) {
      re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
      var arrSplit = num.match(re);
      //检查生日日期是否正确
      var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
      var bGoodDay;
      bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
      if (!bGoodDay) {
        //alert(dtmBirth.getYear());
        //alert(arrSplit[2]);
        //alert('输入的身份证号里出生日期不对！');
        return false;
      }
      else {
        //检验18位身份证的校验码是否正确。
        //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        var valnum;
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var nTemp = 0, k;
        for (k = 0; k < 17; k++) {
          nTemp += num.substr(k, 1) * arrInt[k];
        }
        valnum = arrCh[nTemp % 11];
        if (valnum != num.substr(17, 1)) {
          //alert('18位身份证的校验码不正确！应该为：' + valnum);
          return false;
        }
        return true;
      }
    }
    return false;
  }

  render() {
    return (
            <div style={{background:"white"}}>
           <form style={{width:"600px",margin:"10px auto",padding:"30px 0"}}>
              <h3 style={{textAlign:"center"}}>注册</h3>
              <InputBox header = '手机号' indeed={true} handleSelect = {this.phoneChange} />
              <InputBox header = '密码' indeed={true} handleSelect = {this.passwordChange} />
              <InputBox header = '姓名' indeed={true} handleSelect = {this.nameChange} />
              <InputBox header = '身份证号' indeed={true} handleSelect = {this.identifiedChange} />
              <InputBox header = '推荐人' handleSelect = {this.referrerChange} />
              <div style={{height:'200px',overflowY:'scroll'}}>
              <p style={{color:"red"}}>请您正确填写个人信息，本大赛禁止冒名注册，禁止一人多户；通过复赛晋级后，您需凭个人身份证到本公司验证个人身份，如信息不符，则取消晋级资格！</p>
              <h4 style={{textAlign:'center'}}>保密协议</h4>甲方：锦世翔资产<br />
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
              </div>
              <br/>
              <label>同意:&nbsp;<input type="checkbox" onChange={this.protocolChange} /></label>
            <br/>
            <br/>
        <button onClick={this.handleClick} className="btn btn-primary" style={{width:"100%"}}>
          提交
        </button>
            </form>
      </div>
    )
  } 
}

