let defaultState = {
    auother:'lixiaobai'
}

export default (state=defaultState,actions:{type:string,[propName:string]:unknown})=>{
    switch(actions.type){
        default:
            return state;
    }
}