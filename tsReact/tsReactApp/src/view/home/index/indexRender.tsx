import React from 'react';
import {Button} from 'antd'
import { Ihistory } from '../../../common/interface';

export default (prop:Ihistory)=>{
    const goLogin =  ()=>{
        prop.history.push('/login')
        localStorage.setItem('beforeLoginPath',prop.location.pathname)
    }
    return (
        <div>
            <Button onClick={goLogin}>去登陆</Button>
        </div>
    )
}