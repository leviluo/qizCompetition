import React, { Component, PropTypes } from 'react'
import PageNavBar from './PageNavBar'

export default class CheckTableBox extends Component{

        state = {
            currentPage:1,
            averagenum:10
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

        showButton = (e,id)=>{

            this.setState({
                isShowButton:id
            })
        }

        hiddenButton = (e,id)=>{
            this.setState({
                isShowButton:undefined
            })
        }

        deleteMulti = (e) =>{
          console.log(this.state.chooseItems)
        }

        setStyle = (directive,id) =>{
          if (directive=='on') {
            var color = '#efefef'
            var flag = true;
          }else if(directive=='off'){
            var color = '#fff'
            var flag = false;
          }
          var items = document.getElementsByName('select')
          for (var i = 0; i < items.length; i++) {
            items[i].checked = flag
            items[i].parentNode.parentNode.style.background = color
          };
          if (id>=0) {
            items[id].checked = true;
            items[id].parentNode.parentNode.style.background = '#efefef'
          };
        }

        chooseOne = (e,id)=>{
            this.setStyle('off',id-(this.state.currentPage-1)*this.state.averagenum)
            this.setState({
              chooseItems:[id]
            })
            // e.target.parentNode.style.background = '#efefef'
        }

        chooseMulti =(e,id)=>{
            console.log(id)
          var items = this.state.chooseItems;
          if (!e.target.checked) {
            e.target.parentNode.parentNode.style.background = '#fff'
            for (var i = 0; i < this.state.chooseItems.length; i++) {
              if(this.state.chooseItems[i] == id){
                items.splice(i,1)
                break
              }
            };
          }else{
            e.target.parentNode.parentNode.style.background = '#efefef'
            items.push(id);
          }

            this.setState({
                chooseItems:items
            })
          e.stopPropagation()
        }

        chooseAll = (e)=>{
          if(e.target.checked){
            this.setStyle('on')
            this.setState({
              chooseItems:[0,1,2,3,4,5,6,7,8,9]
            })
          }else{
            this.setStyle('off')
            this.setState({
              chooseItems:[]
            })
          }
        }

        render() {
            const {tableHeader,data} = this.props
            var headerItems = [< th key="0" style={{width:'5%'}}><input type="checkbox" onClick={this.chooseAll}/></th>];
            for (var i = 0; i < tableHeader.length; i++) {
                headerItems.push( < th key={i+1} style={{width:tableHeader[i].width}}> { tableHeader[i].value } < /th>);
            };
            var items = []; 
            //判断是否空数据
            if (data.id){
                items.push(<tr key="0"><td colSpan={tableHeader.length} style={{color:'red'}}>{data.msg}</td></tr>)
            }
            var operateData = (i) =>{
            if (data[i].title && data[i].title.length>30) {
                  var title = data[i].title.substr(0,30)+'....'
                }else{
                  var title = data[i].title
                }
                  var tds = [];
                for (var j = 0; j < tableHeader.length; j++) {
                    if (tableHeader[j].key=='title') {
                    tds.push(<td key={j+1} style={{lineHeight:'28px'}}>{title}{this.state.isShowButton == (i) && <span className="pull-right"><button className="btn btn-primary btn-sm" onClick={(e)=>this.props.modify(e,data[i].id,i)}>修改</button>&nbsp;<button className="btn btn-primary btn-sm" onClick={(e)=>this.props.operateData2(e,data[i].id)}>删除</button></span>}</td>)
                    continue;
                    };
                    if (tableHeader[j].key=='profits') {
                    tds.push(<td key={j+1} style={{lineHeight:'28px'}}>{data[i][tableHeader[j].key]}{this.state.isShowButton == (i) && <span className="pull-right"><button className="btn btn-primary btn-sm" onClick={(e)=>this.props.operateData2(e,data[i].id)}>{this.props.operateData2Header}</button></span>}</td>)
                    continue;
                    };
                    if (tableHeader[j].key=='type') {
                        if (data[i].type==0) {
                            tds.push(<td key={j+1}>公告</td>)
                        }else{
                            tds.push(<td key={j+1}>规则</td>)
                        }
                        continue
                    };
                    tds.push(<td key={j+1}>{data[i][tableHeader[j].key]}</td>)
                };
                // console.log(tds)
                tds.unshift(<td key="0"><input type="checkbox" name="select" onClick={(e)=>this.chooseMulti(e,i)}/></td>)
                // console.log(tds)
                items.push(<tr key={i} onMouseOver={(e)=>this.showButton(e,i)} onMouseLeave={this.hiddenButton} onClick={(e)=>this.chooseOne(e,i)}>{tds}</tr>)
            }
            // console.log(data)
            //判断是否空数据
            if (data.length != 0) {
                for (var i = 0; i < data.length; i++) {
                    operateData(i)
                };
            };  

            let currentPage = this.state.currentPage;
            let pageNums = Math.ceil(items.length/this.state.averagenum);
            // const styles = require('./CheckTableBox.scss')
            return (<div><div className="btn-group pull-right" >
            {this.props.operateData1Header && <button className="btn btn-primary" onClick={this.props.operateData1}>{this.props.operateData1Header}</button>}
            {this.props.operateData2Header && <button className="btn btn-primary" onClick={(e)=>this.props.operateData2(e,this.state.chooseItems)}>{this.props.operateData2Header}</button>}
            </div><table className = "table table-hover" ><thead><tr style={{background:'#fff'}}>{headerItems}</tr></thead><tbody>{items.slice(this.state.averagenum*(currentPage-1),this.state.averagenum*currentPage)}</tbody></table>
                {!this.props.PageNavBar && <PageNavBar pagego={this.pagego} firstpage={this.firstpage} lastpage={this.lastpage} pageup={this.pageup} pagedown={this.pagedown} pageNums={pageNums} currentPage={currentPage}/>}</div>
                )
            }
}

