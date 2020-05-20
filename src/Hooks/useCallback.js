import React from 'react'
const useCallback = React.memo(function({val, onChange}) {
  console.log('render...',val,onChange);
  
  return <input value={val} onChange={onChange} />;
});
export default useCallback