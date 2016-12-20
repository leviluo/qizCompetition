import React, { Component, PropTypes } from 'react'
import LoginRegister from './LoginRegister'
import Logout from './components/Logout'
import Tip from './components/Tip'
// import {isIE} from './utils/browerType'
import { loginUser, logoutUser } from '../actions/auth'
import { openTips } from '../actions/fetchDataQuote'
import { connect } from 'react-redux'
import { Link,IndexLink  } from 'react-router'


@connect(
    state => ({
        Tips: state.Tips,
        isAuthenticated: state.auth.isAuthenticated,
        role: state.auth.role,
    }), { loginUser, logoutUser, openTips }
)

export default class Index extends Component {

    // static propTypes = {
    //     isAuthenticated: PropTypes.bool.isRequired,
    //   }

    componentWillMount = () => {
        
        // if (isIE()==1) {
        //     alert('抱歉,您目前可能使用的旧版IE浏览器兼容性不佳,请更换最新的chorme浏览器或QQ浏览器,搜狗高速浏览器。')
        // }
    }

    render() {
        require('./home.scss')

        const { isAuthenticated, role } = this.props
        return ( < div >
            < nav className = 'navbar navbar-default' >
            < div className = 'container-fluid' >
            < div className = "navbar-header" >
            < a className = "navbar-brand" > < img src = "img/logo.png"
            alt = "logo"
            width = "150"
            className = "img-responsive"
            style = {{ marginTop: "-12px" }}
            /></a >
            < a className = "navbar-brand" > < strong style = {{ letterSpacing: '4px', color: 'orange' }} > 锦世翔期货大师赛 < /strong></a >
            < /div> 
            < div > 
            {!isAuthenticated &&
                < div className = 'navbar-form pull-right' >
                < LoginRegister
                id = {this.props.params.id}
                openTips = { this.props.openTips }
                /> < /div>
            } 
                < ul className = "nav navbar-nav" >
                    < li >
                    < IndexLink to = "/" activeClassName = "myactive" > 首页 < /IndexLink> < /li> 
                {role != 1 &&< li >< Link to = "/memberCenter" activeClassName = "myactive" > 个人中心 < /Link> < /li>} 
                {role == 1 &&< li >< Link to = "/adminCenter" activeClassName = "myactive" > 管理中心 < /Link> < /li>} 
                        < li >< Link to = "/download" activeClassName = "myactive" > 下载 < /Link> < /li>
                < /ul> 
                {isAuthenticated && < Logout onLogoutClick = {() => this.props.logoutUser() }/>}
            < /div> 
            < /div> 
            < /nav> 
            {this.props.Tips.tipstate && < Tip tipText = { this.props.Tips }/> } 
            { this.props.children } 
            < /div>
            )
        }
    }
