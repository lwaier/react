import {SETNAME} from './../actions';

const defaultState = {
    name:'lixiaobai',
    age:'18',
    hoppy:'I need you'
}

const work = (state=defaultState,actions)=>{
    console.log(actions,'this is my actions');
    switch(actions.type){
        case SETNAME:
            return {...state,name:actions.name}
        default:
            return state;
    }
}

export default work