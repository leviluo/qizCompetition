import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { closeTips } from '../../actions/fetchDataQuote';

@connect(
  state => ({
    // dispatch:state.dispatch,
    }),
  {closeTips}
)

export default class Tip extends Component {

    componentWillMount = () => {
        let that = this;
        
        setTimeout(function() {
            that.close();
        }, 2000)

        if (this.props.tipText.tipText.id == 0 && this.props.update) {
            this.props.update();
        };
    }
    
    componentDidMount = () => {
        document.getElementById('tips').style.left = ((document.body.clientWidth - document.getElementById('tips').offsetWidth) / 2) + 'px';
    }

    componentWillUpdate() {

    }

    close = () =>{
        this.props.closeTips();
    }

    static PropTypes = {
        // text: React.PropTypes.string,
    }

    render() {
        return ( < div id = "tips"
            style = {
                { padding: '0 10px', clear: 'both', height: '35px', position: 'absolute', zIndex: '9999', lineHeight: '35px', backgroundColor: 'rgba(0,139,0,1)', textAlign: 'center', color: 'white', borderRadius: '5px' } } > { this.props.tipText.tipText.msg || this.props.tipText.tipText.message || this.props.tipText.tipText} < button onClick = { this.close }
            className = "close"
            style = {
                { margin: '7px',color:'white' } } > &times; < /button></div >
        )
    }
}
