import React, { Component, PropTypes } from 'react'
import PageNavBar from './PageNavBar'
import {Link} from 'react-router'

export default class TableBox extends Component{

        state = {
            currentPage:1,
        }    

        componentDidUpdate =() =>{

        }

        componentWillMount =()=>{

        }

        pageup = (e)=>{
            if (this.state.currentPage == 1) {return};
            this.setState({
                currentPage:this.state.currentPage == 1 ? 1 : this.state.currentPage - 1
            })
        }

        pagedown = (e,pageNums)=>{
            if (this.state.currentPage == pageNums) {return};
            this.setState({
                currentPage:this.state.currentPage == pageNums ? pageNums : this.state.currentPage + 1
            })
        }

        firstpage = () =>{
            if (this.state.currentPage == 1) {return};
            this.setState({
                currentPage:1
            })
        }

        lastpage = (e,pageNums) =>{
            if (this.state.currentPage == pageNums) {return};
            this.setState({
                currentPage:pageNums
            })
        }

        pagego = (e,currentPage) =>{
            if (this.state.currentPage == currentPage) {return};
                this.setState({
                    currentPage:currentPage == undefined ? e.target.getAttribute("value") : currentPage
                })
        }

        render() {
            const averagenum = 10;
            var tableHeader = [];
            for (var i = 0; i < this.props.tableHeader.length; i++) {
                tableHeader.push( < th key={i}> { this.props.tableHeader[i].value } < /th>);
            };
            var items = []; 
            if (this.props.data.id){
                items.push(<tr key="0"><td colSpan={this.props.tableHeader.length} style={{color:'red'}}>{this.props.data.msg}</td></tr>)
            }

            if (this.props.data.length != 0) {
                for (var i = 0; i < this.props.data.length; i++) {
                    var array = [];
                    this.props.data[i].rank = i+1;

                    for (var j = 0; j < this.props.tableHeader.length; j++) {
                        if (this.props.tableHeader[j].key == 'type') {
                            if (this.props.data[i].type==0) {
                                array.push(<td key = {j} >公告</td>)
                            }else{
                                array.push(<td key = {j} >规则</td>)
                            }
                            continue
                        };
                         if (this.props.tableHeader[j].key == 'title') {
                            array.push(<td key = {j} ><Link to={`/articleDetail/${this.props.data[i].id}`} query={{type: 'Original'}}>{this.props.data[i].title}</Link></td>)
                            continue
                         }
                         if (this.props.tableHeader[j].key == 'updatedAt' || this.props.tableHeader[j].key == 'reg_time' ) {
                            array.push(<td key = {j} >{ this.props.data[i][this.props.tableHeader[j].key].substr(0,10)}</td>)
                            continue
                         }
                         if (this.props.tableHeader[j].key == '14') {
                            if (this.props.data[i][this.props.tableHeader[j].key]) {
                            array.push(<td key = {j} >{ (parseFloat(this.props.data[i][this.props.tableHeader[j].key])*100).toFixed(2) + '%'}</td>)
                            }else{
                            array.push(<td key = {j} ></td>)
                            }
                            continue
                         }
                         if (this.props.tableHeader[j].key == '11') {
                            if (this.props.data[i][this.props.tableHeader[j].key]) {
                            array.push(<td key = {j} >{ (parseFloat(this.props.data[i][this.props.tableHeader[j].key])).toFixed(2)}</td>)
                            }else{
                            array.push(<td key = {j} ></td>)
                            }
                            continue
                         }
                         if (this.props.tableHeader[j].key == '1') {
                            if (this.props.data[i][this.props.tableHeader[j].key].length == 11) {
                                var phone = this.props.data[i][this.props.tableHeader[j].key].substr(0,3) + '****' + this.props.data[i][this.props.tableHeader[j].key].slice(-4)
                                array.push(<td key = {j} >{phone}</td>)
                            }else{
                                array.push(<td key = {j} ></td>)
                            }
                            continue
                         }
                         if (this.props.tableHeader[j].key == '3') {
                            array.push(<td key = {j} >{ parseInt(this.props.data[i][this.props.tableHeader[j].key])}</td>)
                            continue
                         }
                        array.push(<td key = {j} >{ this.props.data[i][this.props.tableHeader[j].key] }</td>)
                    }
                    items.push( <tr key = {i} style={{cursor:'pointer'}} >{array}</tr> );
                    // };
                }
            }else{
                return <div></div>
            }

                let currentPage = this.state.currentPage;
                let pageNums = Math.ceil(items.length/averagenum);
                return (<div><table className = "table table-hover" ><thead><tr style={{background:'#fff'}}>{tableHeader}</tr></thead><tbody style={{background:'#fff'}}>{items.slice(averagenum*(currentPage-1),averagenum*currentPage)}</tbody></table>
                    {!this.props.PageNavBar && <PageNavBar pagego={this.pagego} firstpage={this.firstpage} lastpage={this.lastpage} pageup={this.pageup} pagedown={this.pagedown} pageNums={pageNums} currentPage={currentPage}/>}</div>
                )
            }
}

