import React, { Component, PropTypes } from 'react'
// import { Editor, EditorState } from 'draft-js';
import MyEditor from './components/Editor'
import InputBox from './components/InputBox'
import RadioBox from './components/RadioBox'
import ModalBox from './components/Modal'
import Confirms from './components/Confirms'
import CheckTableBox from './components/CheckTableBox'
import TableBox from './components/TableBox'
import Tip from './components/Tip'
import {connect} from 'react-redux';
import { openTips,operateDataQuote,articleListDataQuote,articleDetailDataQuote,memberInfoList} from '../actions/fetchDataQuote';
// import {asyncConnect} from 'redux-async-connect'

const items = document.getElementsByName('ulNav');
const radioItems = [{id:0,value:'公告'},{id:1,value:'规则'}]
const ArticleHeader = [
{key:'type',value:'类型',width:'10%'},
{key:'title',value:'标题',width:'70%'},
{key:'updatedAt',value:'最后修改时间',width:'15%'}
]

const preliminaryEliminatedHeader = [
{key:"account",value:"账户",width:"20%"},
{key:"profits",value:"利润",width:"20%"},
{key:"days",value:"持续天数",width:"20%"}
]

const memberInfoHeader = [
    {key:"id",value:"编号"},
    {key:"userid",value:"账户"},
    {key:"name",value:"姓名"},
    {key:"identitycard",value:"身份证"},
    {key:"reg_time",value:"注册时间"}
]
// @asyncConnect([{
//   promise: ({store: {dispatch, getState}}) => {
//     const promises = [];
//     if (!getState().articleListDataQuotes.isloaded) {
//       promises.push(dispatch(articleListDataQuote('public/articleListData')));
//     }
//     return Promise.all(promises);
//   }
// }])
@connect(
  state => ({
    Tips:state.Tips,
    articleListData:state.articleListDataQuotes.articleListData,
    memberInfoListData:state.memberInfoListDataQuotes.memberInfoListData,
    articleDetailData:state.articleDetailDataQuotes.articleDetailData
    }),
  {openTips,operateDataQuote,articleDetailDataQuote,articleListDataQuote,memberInfoList}
)

export default class memberCenter extends Component{

        state = {
            view:'memberDegree',
            type:0,
            title:'',
            chooseItems:[],
            open:false,
            flag:true
        }

        changeViews = (e,target) =>{
            this.setState({
                view:target
            });
            if (target=="articleManage") {
                if(!this.props.articleListData)this.props.articleListDataQuote('public/articleListData')
            } else if (target == "memberManage") {
                if(!this.props.memberInfoListData)this.props.memberInfoList('admin/memberInfoList')
            };
            
            for (var i = 0; i < items.length; i++) {
                items[i].style.background = 'none'
                items[i].style.color = '#333'
                items[i].style.border = 'none'
            };
            e.target.style.background = 'white';
            e.target.style.color = '#1874CD';
            e.target.style.borderLeft = '2px solid #1874CD';
        }

        titleChange = (e)=>{
            this.setState({
                title:e.target.value
            })
        }

        typeChange = (e) =>{
            this.setState({
                type:e.target.value
            })
        }

        editorContent =(e)=>{
          this.setState({
            articleContent:e.target.innerHTML
          })
        }

        componentWillReceiveProps =()=>{
          // console.log('要接收props')
          // console.log(this.props)
        }

        componentWillUpdate = ()=>{
            // console.log('即将更新数据')
            // console.log(this.props)
        }

        componentDidUpdate =()=>{
            console.log(this.props)
            if(this.props.Tips.tipText.id == 0 && this.props.Tips.tipType=="Article" && this.state.flag){
                this.setState({
                    flag:false
                })
                this.props.articleListDataQuote('public/articleListData')
            }
            if (!this.state.flag && !this.props.Tips.tipstate) {
                this.setState({
                    flag:true
                })
            };
        }

        updateView =()=>{
            this.props.articleListDataQuote('public/articleListData')
        }

        submitData =()=>{
          if (!this.state.title) {
            this.props.openTips('未填写标题')
            return;
          };
          if (!this.state.type && this.state.type!=0) {
            this.props.openTips('未填写类型')
            return;
          };
          if (!this.state.articleContent) {
            this.props.openTips('未填写内容')
            return;
          };

          let body = {
            type:this.state.header=="发布新公告" ? "add" : "modify",
            title:this.state.title,
            articletype:this.state.type,
            content:this.state.articleContent,
            id:this.state.id
          }
            
          this.props.operateDataQuote('admin/Article',body,"Article")

          this.setState({
            open:this.state.open ? false : true,
          })

        }

        postActicle = (e) =>{
          this.setState({
            open:this.state.open ? false : true,
            header:"发布新公告",
            content:(<div><InputBox header="文章标题" indeed={true} handleSelect = {this.titleChange}/>
            <RadioBox header="类型" indeed={true} name="type" defaultValue={this.state.type} handleRadio = {this.typeChange} items={radioItems}/>
            <MyEditor editorChange={this.editorContent} /></div>),
            id:0,
            title:'',
            articleContent:'',
            type:0
          })
        }

        modify = (e,id,index) =>{
          // 去获取文章内容
          this.props.articleDetailDataQuote('public/articleDetailData',{id:id})
          this.setState({
            open:this.state.open ? false : true,
            header:"修改公告",
            content:(<div><InputBox header="文章标题" indeed={true} defaultValue={this.props.articleListData[index].title} handleSelect = {this.titleChange}/>
            <RadioBox header="类型" indeed={true} name="type" defaultValue={this.props.articleListData[index].type} handleRadio = {this.typeChange} items={radioItems}/>
            <MyEditor editorChange={this.editorContent}  setContent = {this.setContent} defaultValue={this.props.articleDetailData.content} /></div>),
            id:id,
            title:this.props.articleListData[index].title,
            // articleContent:this.props.articleDetailData.content,
            type:this.props.articleListData[index].type
          })
        }

        setContent = (e)=>{
          this.setState({
            articleContent:this.props.articleDetailData.content,
          })
        }

        deleteModal = (e,item) => {
            if (!item) {
                this.props.openTips('请选择数据')
                return
            };
            e.stopPropagation();
            var ids = [];
            if(typeof item =='object'){
              for (var i = 0; i < item.length; i++) {
                    ids.push(this.props.articleListData[item[i]].id)
                    continue
              };
            }
            this.setState({
                ids:typeof item == 'number' ? [item] : ids,
                openConfirms: this.state.openConfirms ? false : true,
                ConfirmText:`确认要删除这些公告吗?`,
            })
        }

        confirm = (e) =>{
            this.setState({ 
                openConfirms: this.state.openConfirms ? false : true,
            })
            this.props.operateDataQuote("admin/deleteArticle",{id:this.state.ids},"Article")
        }

        setDegree =(e,flag)=>{

          var pattern = /^[1][34578][0-9]{9}$/;

          if (!pattern.test(this.state.accountDegree)) {
              this.props.openTips('账户格式不正确')
              return;
          };

            this.props.operateDataQuote("/admin/setDegree",{account:this.state.accountDegree,flag:flag},"setDegree")
        }

        accountChange =(e) =>{
            this.setState({
                accountDegree : e.target.value
            })
        }

          render() {
            console.log(this.props.memberInfoListData)
            const styles = require('./adminCenter.scss')
            // const items =[
            //     {account:"1111",profits:"100",days:"5"},
            //     {account:"2222",profits:"100",days:"5"},
            //     {account:"1111",profits:"100",days:"5"},
            //     {account:"1111",profits:"100",days:"5"},
            //     {account:"1111",profits:"100",days:"5"},
            //     {account:"1111",profits:"100",days:"5"}
            // ]
            return <div>
            <ul className={styles.rightul}>
                <li><a name="ulNav" onClick={(e)=>this.changeViews(e,'memberDegree')}>会员等级管理</a></li>
                <li><a name="ulNav" onClick={(e)=>this.changeViews(e,'articleManage')}>文章管理</a></li>
                <li><a name="ulNav" onClick={(e)=>this.changeViews(e,'memberManage')}>会员管理</a></li>
            </ul>
            <div className={styles.divright}>
            { this.state.view=='articleManage' && <div>
            <CheckTableBox 
            operateData1 = {this.postActicle}
            operateData1Header = "新增"
            modify = {this.modify}
            operateData2 = {this.deleteModal}
            operateData2Header = "批量删除"
            tableHeader = {ArticleHeader} 
            data={this.props.articleListData}
            />
            </div>}
            { this.state.view=='memberDegree' && <div style={{textAlign:"center"}}>
            {false && <div>

            <h4>初赛淘汰</h4>
            <CheckTableBox 
            operateData1 = {this.postActicle}
            operateData1Header = "批量淘汰"
            operateData2Header = "淘汰"
            tableHeader = {preliminaryEliminatedHeader} 
            data={items}
            />
            <br />
            <br />
            <h4>初赛晋级</h4>
            <CheckTableBox 
            operateData1 = {this.postActicle}
            operateData1Header = "批量晋级"
            operateData2Header = "晋级"
            tableHeader = {preliminaryEliminatedHeader} 
            data={items}
            />
            <br />
            <br />
            <h4>复赛淘汰</h4>
            <CheckTableBox 
            operateData1 = {this.postActicle}
            operateData1Header = "批量淘汰"
            operateData2Header = "淘汰"
            tableHeader = {preliminaryEliminatedHeader} 
            data={items}
            /></div>}
            <InputBox header="用户账户" indeed={true} handleSelect = {this.accountChange}/>
            <button className="btn btn-primary" onClick={(e)=>this.setDegree(e,1)}>初赛晋级</button>
            &nbsp;
            <button className="btn btn-primary" onClick={(e)=>this.setDegree(e,0)}>复赛降级</button>
            </div>}
            {this.state.view=='memberManage' && <div>
                <TableBox tableHeader = { memberInfoHeader }
                  data = { this.props.memberInfoListData } />
            </div>}
            <ModalBox open = { this.state.open }
            content = { this.state.content }
            head = {this.state.header}
            submitData = { this.submitData }
            />
            <Confirms confirm={this.confirm} ConfirmText={this.state.ConfirmText} open = {this.state.openConfirms} />
            </div>
            </div>;
          }
}

// SelectBox.PropTypes = {
//     items: React.PropTypes.array,
//     header: React.PropTypes.string,
//     defaultValue: React.PropTypes.string,
// }

