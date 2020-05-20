
import React,{memo} from 'react';
import  './index.css';


 const CssMouse=memo(()=>{
  return (
    <div className="block">
      <div className="block_hoverer">上</div>
      <div className="block_hoverer">下</div>
      <div className="block_hoverer">左</div>
      <div className="block_hoverer">右</div>
      <div className="block_content">
          Hover me!
      </div>
  </div>
  )
})
export default CssMouse