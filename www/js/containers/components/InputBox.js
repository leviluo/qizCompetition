import React, { Component, PropTypes } from 'react'

export default class InputBox extends Component{

        handleSelect(){
           // alert('okkk')
        }

        render() {
                return ( < div className = "input-group form-group" style={{width:'100%'}}>
                    < label className = "input-group-addon" style={{width:'120px'}}> { this.props.header }{this.props.indeed && <span className="pull-left" style={{color:'red'}}>*</span>}:< /label> < input className = "form-control"
                    onChange = { this.props.handleSelect } defaultValue={this.props.defaultValue} /> < /div >
                )
            }
}

InputBox.PropTypes = {
    header: React.PropTypes.string,
}