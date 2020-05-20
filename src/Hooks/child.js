import React,{useState,useEffect,useContext} from 'react';
import { MyContext } from './utils'

const Child = ({count })=>{
  const [i,setI]=useState(1)
  const { setChild } = useContext(MyContext);

  useEffect(() => {
    
    // const time= setTimeout(() => {
    //   setI((preState)=>preState+1)
    // }, 1000);
    // console.log(time,'ii',i)

    // return ()=>{
    //   clearTimeout(time)
    // };
  },[i]);
  return (
    <div>
      <div>child Count {count}</div>
      <div>I {i}</div>
      <button onClick={()=>setChild(0)}>clearChild</button>
    </div>
  )
}
export default Child
