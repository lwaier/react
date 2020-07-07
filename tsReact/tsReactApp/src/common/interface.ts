export interface IinputeValue {
    persist:any;
    target:{value:string}
}

export interface Ihistory {
    history:{
        push:(str:string,opt?:{})=>void
    }
}