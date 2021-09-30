// props = onClick 실행되는거, button text에 들어갈것, bg, 사이즈
import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { text, _onClick, btnColor, fontColor, border} = props;
  const style = {btnColor, fontColor, border};
  return (
    <React.Fragment>
      <ElButton {...style} type="button" onClick={_onClick}>{text}</ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  text: "텍스트",
  _onClick: () => {},
};

const ElButton = styled.button`
  width : 100%;
  ${(props)=> props.btnColor? `background-color : ${props.btnColor}`: `background-color : #212121`};
  ${(props)=> props.fontColor? `color : ${props.fontColor}`: `color : #ffffff`};
  padding : 12px 0px;
  box-sizing: border-box;
  border : ${(props)=>props.border? `${props.border}` : "none"};
`;

export default Button;
