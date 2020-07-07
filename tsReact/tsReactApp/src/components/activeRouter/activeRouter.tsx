import React from 'react';
import {TransitionGroup,CSSTransition} from 'react-transition-group';
import {Switch,Route} from 'react-router-dom';
import './activeRouter.scss';


const ActiveRouter = (props:{children?:any,type?:string,duration?:number}) => {
    const { children } = props
    return (
        <Route
            render={({ location }) => (
                <TransitionGroup>
                    <CSSTransition
                        key={location.pathname}
                        classNames={props.type || 'fade'} 
                        timeout={props.duration || 300}
                    >
                        <Switch location={location}>{children}</Switch>
                    </CSSTransition>
                </TransitionGroup>
            )}
        />
    )
}

export default ActiveRouter;