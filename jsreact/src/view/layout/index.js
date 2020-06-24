import React from 'react';
import {Switch,Route,Redirect,Link} from 'react-router-dom'
import Work from './../work'
import Learn from './../learn'
import Sleep from './../sleep'
import store from './../../store'
import {setName} from './../../store/actions/index'

// import {createHashHistory} from "history"

// const history = createHashHistory(); 


export default class Layout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list:[
                {name:'/work',text:'work',active:true},
                {name:'/learn',text:'learn',active:false},
                {name:'/sleep/aa/xiaobai',text:'sleep',active:false},
            ],
            name:'lixiaobai'
        }

        //打印props看看啥情况
        console.log(props,'这里是layout的路由');
        this.history = props.history
    }
    setNavColor(index){
        let list = this.state.list.map((item,indexnew)=>{
            if(indexnew===index){
                item.active = true
            }else{
                item.active = false
            }
            return item
        })
        this.setState({
            list,
        })

    }
    goToSleep(){
       
        // history.push('/work')
        store.dispatch(setName({name:'我是魔鬼伟'}))
    }
    render(){
        return(
            <div style={{width:'100%',height:'100%'}}>
                <p onClick={()=>{this.goToSleep()}}>
                    author : {this.state.name}
                </p>
                <ul style={{padding:'0px',margin:'20px 0',width:'100%',height:'40px'}}>
                    {
                        this.state.list.map((item,index)=>{
                            return(
                                <Link to={item.name}  key={item.name}>
                                <li style={{listStyle:'none',float:'left',width:'33.33%',textAlign:'center',color:item.active?'#008488':''}} 
                                onClick={()=>{this.setNavColor(index)}}>
                                    <span>{item.text}</span>
                                </li>
                                </Link>
                            )
                        })
                    }
                </ul>
                <Switch>
                    <Route exact path="/" render={()=><Redirect to="/work" />}></Route>
                    <Route path="/work" component={Work} ></Route>
                    <Route path="/learn" component={Learn} ></Route>
                    <Route path="/sleep/aa/:id" component={Sleep} ></Route>
                </Switch>
            </div>
            
        ) 
    }
}