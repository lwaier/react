import React, { useEffect,useState, useCallback } from 'react'
import {contextItem} from './../index'
export default function CpOne (){
    const [count,setCount] = useState(0)
    const abc = useCallback(()=>{
        return count+1
    },[count]) 
    useEffect(()=>{
        console.log(1,'');
        abc()
    },[abc])

    // const aa= useContext(contextItem)
    // console.log(aa,'');
    return (
        <div onClick={
            ()=>{
                setCount(2)
            }
        }>
            sdklalal{count}
            <p style={{color:'red'}}>
            <contextItem.Consumer>
                    {value=>console.log(value,'')}
            </contextItem.Consumer>
            </p>
        </div>
    )
}