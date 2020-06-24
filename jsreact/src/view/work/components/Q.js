
import React from 'react'
import propTypes from 'prop-types'
export default class Q extends React.Component{
    static defaultProps = {
        username:100
    }
    constructor(props){
        super(props);
        this.state = {
            Q:'qq'
        }
        console.log(props,'这是接受的props')
    }

    componentDidMount(){
        console.log(this,'');
    }
    componentWillReceiveProps(props){
        console.log(this.props,'旧的props');
        console.log(props,'新的props');
    }
    shouldComponentUpdate(){
        console.log(this.props,'');
        return true
    }
    componentWillUpdate(){
        console.log('我即将完成更新');
    }
    componentDidUpdate(){
        console.log('我更新完成');
    }
    render(){
        return(
            <div>
                {this.context.userage}
                {/* {undefined} */}
                <p>
                    {this.props.name}
                </p>
                <p style={{color:'blue'}}>
                    {this.state.Q}
                </p>
                {this.props.children.map((item,index)=>{
                    return(
                        <div key={index}>
                            <p>{item.props.children}</p>
                        </div>
                    )
                })}
                <p>
1
                </p>
                <div>
                    {this.props.children[0]}
                </div>
                <p>
                  2  
                </p>
                <p>
                   3 
                </p>
            </div>
        )
    }
}
Q.defaultProps = {
    ...Q.defaultProps,
    usernamess:100
}

Q.propTypes = {
    name : propTypes.number,
    username : propTypes.number,
    usernamess: propTypes.number
}

Q.contextTypes = {
    userage:propTypes.number
};
