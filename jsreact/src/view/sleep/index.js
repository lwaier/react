import React from 'react'

export default class Sleep extends React.Component{
    constructor(props){
        super(props)
        console.log(props,'sleep的props');

    }
    componentDidMount(){
        console.log(window.location,'window');
    }
    render(){
        return(
            <div>
                sleep
                </div>
        )
    }
}