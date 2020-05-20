import React,{useState,useReducer,useCallback,useMemo,useRef} from 'react';
import Child from './child';
import { MyContext } from './utils';
import UseCallback from './useCallback';
import FancyInput from './useImperativeHandle'


function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

const Parent = ()=>{
  const [count,setCount]=useState(0);
  const [obj,setObj]=useState({color:'red',fontSize:12});
  const [child,setChild]=useState(1);
  const [state, dispatch] = useReducer(reducer, {count:0});
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');

  const onChange1 = useCallback( evt => {
    setVal1(evt.target.value);
  }, []);
  

  const onChange2 = useCallback( evt => {
    setVal2(evt.target.value);
  }, []);
  
  const inputEl = useRef(null);
  const onButtonClick = () => {
    console.log('tag',inputEl)
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };

  return (
    <>
    {/* useState */}
    <div>
      <div>Parent</div>
      <div>count:{count}</div>
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={()=>setCount(prevCount => prevCount + 1)}>+</button>
      <button onClick={()=>setCount(prevCount => prevCount - 1)}>-</button>
    </div>
    {/* useState 不会自动合并更新对象 */}
    <div>
      <div>useState 不会自动合并更新对象</div>
      <div>color:{obj.color},fontSize:{obj.fontSize}</div>
      <button onClick={()=>setObj({color:'blue'})}>修改color</button>
      <button onClick={()=>setObj(prevCount => ({...prevCount,fontSize:16}))}>修改fontSize</button>
    </div>
    {/* useContext */}
    {child&&(
      <MyContext.Provider value={{ setChild }}>
        <Child count={count}  />
      </MyContext.Provider>
    )}
    {/* useReducer useState 的替代方案 */}
      <>
        Count: {state.count}
        <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        <button onClick={() => dispatch({type: 'increment'})}>+</button>
      </>
      {/* useCallback */}
      <UseCallback val={val1} onChange={onChange1}/>
      <UseCallback val={val2} onChange={onChange2}/>
      {/* useMemo */}
      {/* useRef  */}
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
      <FancyInput />
    </>
  )
}
export default Parent
