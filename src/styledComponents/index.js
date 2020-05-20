import React,{Fragment}  from 'react';
import styled from 'styled-components';

// 最基础的用法
 /* 创建了一个Wrapper样式组件，该组件渲染之后是一个div标签 */
const Grid = styled.div`
  background: ${props => (props.primary ? props.mainColor : 'white')};
    display: flex;
    color:blue
`;
// 选择器：标签名和类名
const Wrapper = styled.div`
/* 应用于Wrapper组件本身和Wrapper组件里的所有html标签 */
color: black;

/* 应用于Wrapper组件里的h3标签 */
h3 {
color: red
}

/* 应用于Wrapper组件里的className为blue的html标签 */
.blue {
color: blue
}
`;
// 选择器：伪类和伪元素
// 在styled-components同样可以使用伪类和伪元素，使用方法和原生css一模一样：
const Thing = styled.button`

    color: blue;

    ::before {
      content: '！！！';
    }

    :hover {
      color: red;
    }
  `;
  // &符号表示引用主组件，注意体会加上&符号与不加的区别：
  const Things = styled.div`
  /* 应用于className为blue的Thing组件 */
  &.blue{
  color: blue;
  }

  /* 应用于className为red的Thing组件里的所有子组件或者html标签 */
  .red {
  color: red;
  }`;
  // 上下文选择符
  const ThingNext = styled.div`

  /* 应用于紧邻Thing组件的下一个Thing组件 */
  & + & {
  color: red;
  }

`
function StyledComponents(){
    /*Grid组件跟其余的react组件一样，只不过现在他们有了自己的样式 */
  return(
    <Fragment>
      <Grid  mainColor='#ee6352' primary>
          Hello World!
      </Grid>
      <Wrapper>
        <p>选择器：标签名和类名 </p>
        <h3>红色 h3 标签</h3> 
        <p className="blue" >蓝色 p 标签</p>
      </Wrapper>
      <Thing>
        选择器：伪类和伪元素
      </Thing>
      <Things className="blue" >Thing组件</Things>
      <Fragment>
        <ThingNext>第一个Thing组件</ThingNext>
        <ThingNext>第二个Thing组件</ThingNext>
      </Fragment>
    </Fragment>
  )
}

export default StyledComponents