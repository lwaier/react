import React from 'react';
import { Switch, Route ,Redirect} from 'react-router-dom';
import Index from './index/indexRender'
import IndexTwo from './indexTwo/index'
import IndexThree from './indexThree/index'
import IndexFour from './indexFour/index'
import IndexFive from './indexFive/index'

export default ()=>{
    return(
        <div style={{height:'100vh',position:'relative'}}>
            <Switch>
                <Route path="/home" exact render={()=><Redirect to="/home/index" /> } />
                <Route path="/home/index" component={Index} />
                <Route path="/home/indexTwo" component={IndexTwo} />
                <Route path="/home/indexThree" component={IndexThree} />
                <Route path="/home/indexFour" component={IndexFour} />
                <Route path="/home/indexFive" component={IndexFive} />
            </Switch>
            <div style={{position:'absolute',left:'0',bottom:'0',width:'100%',textAlign:'center',height:'1rem',lineHeight:'1rem'}}>
                此处应该放底部导航
            </div>
        </div>
    )
}