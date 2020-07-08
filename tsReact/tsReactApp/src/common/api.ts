import {IinputeValue} from './interface'; //得到接口

//该函数可以得到Input里面的数据
export const getValue = (data:IinputeValue, callback:(data:string)=>void)=>{
    callback(data.target.value)
}