import React, { useEffect, useReducer ,createContext} from 'react'
import CpOne from './components'
// import React from 'react'

// // let timer = null
// export default class hooks extends React.Component {
//     constructor(){
//         super()
//         this.state={
//             str:'123'
//         }
//     }
//     componentDidMount(){
//         console.log(2,'');
//     }
//     componentDidUpdate(){
//         console.log(2,'');
//     }
//     componentWillUnmount(){
//         console.log(2,'');
//     }
//     render(){
//         return(
//             <div onClick={()=>{
//                 this.setState({
//                     str:'235'
//                 })
//             }}>
//                 {this.state.str}
//             </div>
//         )
//     }
// }

export const contextItem = createContext({aa:1})

export default function Hooks(){
  // const [count,setCount] = useState(0)
  // const 

 

  const [state,dispatch] = useReducer((state,actions)=>{
    switch(actions.type){
      case '001':
      return {...state, count:state.count+1 }
      case '002':
      return {...state, count:state.count+state.setUp}
      case '003':
      return {...state,setUp:actions.setUp}
      default:
      return state
    }
  },{count:0,setUp:2})
  const {count,setUp}= state


  useEffect(()=>{
    let timer = null
    timer=setInterval(()=>{
      
      dispatch({type:'002'})
    },1000)
    return ()=>{
      clearInterval(timer)
    }
  },[])

  return(
    <div>
      sda{count}
      <p onClick={()=>{
        dispatch({type:'003',setUp:5})
      }}>
        sdad{setUp}
      </p>
      <contextItem.Provider value={{name:count}}>
        <CpOne></CpOne>
      </contextItem.Provider>
    </div>
  ) ;
}