import { fromJS } from 'immutable';

const immutableDate = fromJS({
    arr : [1,2,3,4,5],
})

console.log(immutableDate.getIn(['arr',2]),'这里是不可变对象');
console.log(immutableDate.set('arr',100).get('arr'),'这里是不可变对象');
console.log(immutableDate.setIn(['arr',2],100).get('arr').get(1),'这里是不可变对象');
console.log(immutableDate.getIn(['arr',1]),'这里是不可变对象');
console.log(immutableDate.deleteIn(['arr',2]).getIn(['arr',2]),'这里是不可变对象');
const immutableDateOne = immutableDate.set('kkk','1')
console.log(immutableDateOne.get('arr').get(2),'这里是不可变对象');
console.log(immutableDateOne.set('arr','123').get('arr'),'这里是不可变对象');

const immutableDateTwo = fromJS({
    sss:'lixiaobai',
})

console.log(immutableDate.merge(immutableDateTwo).get('arr').get(0),'这里是不可变对象');
console.log(immutableDate.merge(immutableDateTwo).get('sss'),'这里是不可变对象');
console.log(immutableDate.getIn(['arr',2]),'这里是不可变对象');

console.log(immutableDate.get('arr').toJS(),'ss'); 


const defaultState = {
    aa:{    
        bb:[[{name:[123]}],2,3,4]
    }
}




const learn = (state=defaultState,actions)=>{
    switch(actions.type){
        case '000':
            state.aa.bb[0][0].name[0] = actions.bb
        return state
        default:
            return state
    }
}

export default learn    