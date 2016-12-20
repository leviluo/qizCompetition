import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux';
import {isIE} from "../utils/browerType"
import { openTips} from '../../actions/fetchDataQuote';
const colorItems = [
                    "#000000",
                    "#FFFFFF",
                    "#666666",
                    "#F0FFFF",
                    "#808A87",
                    "#CCCCCC",
                    "#808069",
                    "#FAFFF0",
                    "#E6E6E6",
                    "#FAF0E6",
                    "#F5F5F5",
                    "#FFFFCD",
                    "#FCE6C9",
                    "#FFF5EE",
                    "#FF0000",
                    "#FFFF00",
                    "#E3170D",
                    "#FF9912",
                    "#9C661F",
                    "#E3CF57",
                    "#FF7F50",
                    "#FFD700",
                    "#FF6347",
                    "#FF7D40",
                    "#FFC0CB",
                    "#FFE384",
                    "#B0171F",
                    "#FF8000",
                    "#FF00FF",
                    "#ED9121",
                    "#990033",
                    "#8B864E",
                    "#00FF00",
                    "#802A2A",
                    "#00FFFF",
                    "#C76114",
                    "#7FFF00",
                    "#F4A460",
                    "#40E0D0",
                    "#D2B48C",
                    "#082E54",
                    "#BC8F8F",
                    "#228B22",
                    "#A0522D",
                    "#6B8E23",
                    "#C76114",
                    "#0000FF",
                    "#A020F0",
                    "#03A89E",
                    "#DA70D6",
                    "#191970",
                    "#8A2BE2",
                    "#00C78C",
                    "#9933FA"
                    ];

const fontFamilyItems = [
    "Arial","Arial Narrow","Comic Sans MS","Courier New","Courier","Georgia",
    "Helvetica","Impact","Lucida Family","Lucida Sans Unicode",
    "Tahoma","Times New Roman","Trebuchet MS","Verdana",
    "宋体","微软雅黑","黑体","华文细黑","华文仿宋","华文黑体","华文楷体","楷体","方正姚体"
]

const headerItems = [
"P","H1","H2","H3","H4","H5","H6"
]

const fontSizeItems = []

for (var i = 2; i <= 10; i++) {
    fontSizeItems.push(i)
}
@connect(
  state => ({
    articleDetailData:state.articleDetailDataQuotes.articleDetailData
    }),
  {openTips}
)
export default class MyEditor extends Component{

        state = {
            isColor:false,
            isFontFamily:false,
            isFontSize:false,
            lastChooseDiv:{},
            focusOffset:0,
            flag:true
        }

        componentDidMount=()=>{
            document.addEventListener('click',this.resetState,false)
        }

        componentDidUpdate=()=>{
            if (this.props.setContent) { //在修改时,更新内容和state
                if (this.props.setContent && this.props.articleDetailData && this.state.flag) {
                    this.setState({
                        defaultContent:{__html:this.props.articleDetailData.content},
                        flag:false
                    })
                }; 
                this.props.setContent();
            }
        }

        resetState = ()=>{
            this.setState({
                lastChooseDiv:{},
                focusOffset:0
            })
        }

        componentWillUnmount=()=>{
            document.removeEventListener('click',this.resetState,false)
        }

        search =(lastnode)=>{
            if (lastnode==document.getElementById('Content')) {
                return true
            }else if(lastnode==document){
                return false
            }else{
                return this.search(lastnode.parentNode)
            }
        }

        getSelection =()=>{
            let selection = {};
            if(window.getSelection) {
            selection = window.getSelection()
            } else if(document.selection.createRange) {
            selection = document.selection.createRange()
            }
            return selection
        }

            
        setStyle = (e,action,value,changeColor)=>{
            if(e)e.nativeEvent.stopImmediatePropagation();
            let selection = this.getSelection().focusNode

            if (selection) {
                if(!this.search(selection))return
            }else{
                return
            }

            // console.log(action,value)
            // console.log(this.state.focusOffset)
            // console.log(this.state.lastChooseDiv)
            document.getElementById("Content").focus();
            document.execCommand(action, false, value);

            console.log("why")
            if (!isIE()) {
                if (action=='formatBlock') {
                    let headers = document.getElementsByName('header')
                    for (var i = 0; i < headers.length; i++) {
                        headers[i].style.color = '#000'
                    }
                    e.target.style.color = 'rgb(24, 116, 205)'
                }
            };
 

            if(changeColor)e.target.style.color = e.target.style.color == 'rgb(24, 116, 205)' ? 'rgb(0,0,0)' :'rgb(24, 116, 205)'
            
            this.setState({
                isColor:false,
                isFontFamily:false,
                isFontSize:false,
            })
        }

        setColor = (e,action)=>{
            this.setState({
                colorAction:action,
                isColor:this.state.isColor ? false : true
            })
        }

        setFontfamily = (e)=>{
            this.setState({
                isFontFamily: this.state.isFontFamily ? false : true
            })
        }

        setFontsize = (e)=>{
            this.setState({
                isFontSize: this.state.isFontSize ? false : true
            })
        }

        inputImage =(e) =>{
            var me = this

            //判断文件类型
            var value = e.target.value
            var filextension=value.substring(value.lastIndexOf("."),value.length);
            filextension = filextension.toLowerCase();
            if ((filextension!='.jpg')&&(filextension!='.gif')&&(filextension!='.jpeg')&&(filextension!='.png')&&(filextension!='.bmp'))
            {
            this.props.openTips('文件类型不正确')
            return;
            }
            //
            // if (!isIE()) {  //非IE
                var reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = function(evt){
                    me.setStyle(null,"InsertImage",evt.target.result)
                }
            // }else{      //IE
                // 
            // }
        }

        searchStyle =(lastnode,items)=>{
            if (lastnode==document.getElementById('Content')) {
                return items
            }else{
                let item = items
                item.push(lastnode.parentNode.tagName)
                return this.searchStyle(lastnode.parentNode,item)
            }
        }

        chooseStyle = (e) =>{
                e.nativeEvent.stopImmediatePropagation();//react阻止冒泡
                let selection = this.getSelection();
            console.log(selection)
                if (this.state.lastChooseDiv===selection.focusNode && ((this.state.focusOffset+1)==selection.focusOffset || this.state.focusOffset==0)){return}
                this.setState({
                    lastChooseDiv:selection.focusNode,
                })
                var items = this.searchStyle(selection.focusNode,[]);
                // console.log(items)
                for (var i = 0; i < document.getElementsByName('header').length; i++) {
                    document.getElementsByName('header')[i].style.color = '#000'
                }
                for (var i = 0; i < document.getElementsByName('changeColor').length; i++) {
                    document.getElementsByName('changeColor')[i].style.color = '#000'
                }
                for (var i = 0; i < items.length; i++) {
                    if(items[i] == 'DIV'){
                        document.getElementsByName('header')[0].style.color = 'rgb(24, 116, 205)'
                        continue
                    }
                    if (items[i] == 'FONT' || items[i] == 'SPAN') {
                        continue
                    }
                    document.getElementById(items[i]).style.color='rgb(24, 116, 205)'
                }
                if (items.length<1) {
                    document.getElementsByName('header')[0].style.color = 'rgb(24, 116, 205)'
                }
        }

        recordOffset = (e)=>{
            
            if(e.keyCode==8){this.chooseStyle(e)} //backspace键
            if(e.keyCode==13){ //enter键
                for (var i = 0; i < document.getElementsByName('header').length; i++) {
                    document.getElementsByName('header')[i].style.color = '#000'
                }
                document.getElementsByName('header')[0].style.color = 'rgb(24, 116, 205)'
            }
            this.setState({
                focusOffset:this.getSelection().focusOffset,

            })
        }

        toolTips = (e)=>{
            if(!e.target.getAttribute('target'))return
            let element = document.getElementById(e.target.getAttribute('target'))
            element.style.display = 'block'
        }

        toolTipsHide = (e)=>{
             if(!e.target.getAttribute('target'))return
            let element = document.getElementById(e.target.getAttribute('target'))
            element.style.display = 'none'
        }

        render() {
           const styles = require('./Editor.scss')
            return (
                    <div>
                        <div className={styles.toolBar} >
                            <div className='btn-group'>
                                <button onClick={this.setFontfamily} target="fonttips" onMouseOut={this.toolTipsHide} onMouseOver={this.toolTips} className='fa fa-font btn btn-default'><span id="fonttips">字体</span></button>
                                <button onClick={this.setFontsize} target="fontsizetips" onMouseOut={this.toolTipsHide} onMouseOver={this.toolTips} className='fa fa-text-width btn btn-default'><span id="fontsizetips">字号</span></button>
                                
                            </div>&nbsp;
                            <div className='btn-group'>
                                <button onClick={(e)=>this.setColor(e,"ForeColor",null)} target="colortips" onMouseOut={this.toolTipsHide} onMouseOver={this.toolTips} className='btn btn-default' style={{paddingBottom:"4px"}}><i className="fa fa-font" id="FONT" target="colortips" onMouseOut={this.toolTipsHide} onMouseOver={this.toolTips} style={{borderBottom:"2px solid red"}}></i><span id="colortips">字颜色</span></button>
                                <button onClick={(e)=>this.setColor(e,"BackColor",null)} target="backgroundtips" onMouseOut={this.toolTipsHide} onMouseOver={this.toolTips} className='btn btn-default'><i className="fa fa-font" id="SPAN" target="backgroundtips" onMouseOut={this.toolTipsHide} onMouseOver={this.toolTips} style={{background:"red",color:'white',padding:'2px'}}></i><span id="backgroundtips">背景色</span></button>
                            </div>&nbsp;
                            <div className='btn-group'>
                                <button className='btn btn-default fa fa-bold' id="B" target="boldtips" onMouseOut={this.toolTipsHide} onMouseOver={this.toolTips} name="changeColor" onClick={(e)=>this.setStyle(e,"bold",null,true)}><span id="boldtips">粗体</span></button>
                                <button className='btn btn-default fa fa-italic' id="I" target="italictips" onMouseOut={this.toolTipsHide} onMouseOver={this.toolTips} name="changeColor" onClick={(e)=>this.setStyle(e,"italic",null,true)}><span id="italictips">斜体</span></button>
                                <button className='btn btn-default fa fa-underline' id="U" target="underlinetips" onMouseOut={this.toolTipsHide} onMouseOver={this.toolTips} name="changeColor" onClick={(e)=>this.setStyle(e,"underline",null,true)}><span id="underlinetips">下划线</span></button>
                                <button className='btn btn-default fa fa-strikethrough' id="STRIKE" target="strikeThroughtips" onMouseOut={this.toolTipsHide} onMouseOver={this.toolTips} name="changeColor" onClick={(e)=>this.setStyle(e,"strikeThrough",null,true)}><span id="strikeThroughtips">删除线</span></button>
                            </div>&nbsp;
                            <div className='btn-group'>
                                {headerItems.map((header) =>
                                  <button
                                  target={header+'tips'} onMouseOut={this.toolTipsHide} onMouseOver={this.toolTips}
                                    className="btn btn-default btn-sm"
                                        key = {header} name="header" id={header}
                                        onClick={(e)=>this.setStyle(e,"formatBlock","<"+header+">",null)}
                                  >{header}<span id={header+'tips'}>{header}标题</span></button>
                                )}
                            </div>
                            <br />
                            <div style={{marginTop:"5px"}}>
                            <div className='btn-group'>
                                <button target="justifyLefttips" onMouseOut={this.toolTipsHide} onMouseOver={this.toolTips} onClick={(e)=>this.setStyle(e,"justifyLeft",null)} className='btn btn-default fa fa-align-left'><span id="justifyLefttips">左对齐</span></button>
                                <button target="justifyCentertips" onMouseOut={this.toolTipsHide} onMouseOver={this.toolTips} onClick={(e)=>this.setStyle(e,"justifyCenter",null)} className='btn btn-default fa fa-align-center'><span id="justifyCentertips">居中</span></button>
                                <button target="justifyRighttips" onMouseOut={this.toolTipsHide} onMouseOver={this.toolTips} onClick={(e)=>this.setStyle(e,"justifyRight",null)} className='btn btn-default fa fa-align-right'><span id="justifyRighttips">右对齐</span></button>
                                <button target="justifyFulltips" onMouseOut={this.toolTipsHide} onMouseOver={this.toolTips} onClick={(e)=>this.setStyle(e,"justifyFull",null)} className='btn btn-default fa fa-align-justify'><span id="justifyFulltips">两边对齐</span></button>
                            </div>&nbsp;
                            <div className='btn-group'>
                                <button target="indenttips" onMouseOut={this.toolTipsHide} onMouseOver={this.toolTips} className='btn btn-default fa fa-indent'  onClick={(e)=>this.setStyle(e,"indent",null)}><span id="indenttips">缩进</span></button>
                                <button target="outdenttips" onMouseOut={this.toolTipsHide} onMouseOver={this.toolTips} className='btn btn-default fa fa-outdent' onClick={(e)=>this.setStyle(e,"outdent",null)}><span id="outdenttips">减少缩进</span></button>
                            </div>&nbsp;
                            <div className='btn-group'>
                                <button target="insertUnorderedListtips" onMouseOut={this.toolTipsHide} onMouseOver={this.toolTips} className='btn btn-default fa fa-list-ul' onClick={(e)=>this.setStyle(e,"insertUnorderedList",null)}><span id="insertUnorderedListtips">无序列表</span></button>
                                <button target="insertOrderedListtips" onMouseOut={this.toolTipsHide} onMouseOver={this.toolTips} className='btn btn-default fa fa-list-ol' onClick={(e)=>this.setStyle(e,"insertOrderedList",null)}><span id="insertOrderedListtips">有序列表</span></button>
                            </div>&nbsp;
                            <div className={styles.inputdiv + ' btn-group'}>
                                <input type="file" onChange={this.inputImage} multiple={false}/>
                                <button name="image" className='btn btn-default fa fa-image' />
                            </div>
                            
                            </div>
                            {this.state.isColor && <div className={styles.color}>
                                        {colorItems.map((color) =>
                                          <button
                                                key = {color}
                                                style={{background:color}}
                                                onClick={(e)=>this.setStyle(e,this.state.colorAction,color)}
                                          />
                                        )}
                            </div>}
                            {this.state.isFontFamily && <div className={styles.fontFamily}>
                                        {fontFamilyItems.map((font) =>
                                          <button
                                                key = {font}
                                                style={{fontFamily:font}}
                                                onClick={(e)=>this.setStyle(e,"FontName",font)}
                                          >{font}</button>
                                        )}
                            </div>}
                            {this.state.isFontSize && <div className={styles.fontsize}>
                                        {fontSizeItems.map((font) =>
                                          <button
                                                key = {font}
                                                onClick={(e)=>this.setStyle(e,"fontsize",font)}
                                          >{font}</button>
                                        )}
                            </div>}
                        </div>
                        <div id='Content' className={styles.content} dangerouslySetInnerHTML={this.state.defaultContent} onClick={this.chooseStyle} contentEditable onKeyDown={this.recordOffset} onBlur={this.props.editorChange}>
                        
                        </div>
                        </div>
                )
            ;
          }
}


