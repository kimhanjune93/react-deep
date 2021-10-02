// props = onClick 실행되는거, button text에 들어갈것, bg, 사이즈
import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    text,
    _onClick,
    padding,
    width,
    margin,
    btnColor,
    fontColor,
    border,
    is_float,
  } = props;
  const style = { btnColor, fontColor, border, padding, width, margin };
  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{text}</FloatButton>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ElButton {...style} type="button" onClick={_onClick}>
        {text}
      </ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  text: "텍스트",
  _onClick: () => {},
  is_float: false,
};

const ElButton = styled.button`
  /* width: 100%; */
  ${(props) => (props.width ? `width : ${props.width}` : `width : 100%`)};
  ${(props) =>
    props.btnColor
      ? `background-color : ${props.btnColor}`
      : `background-color : #212121`};
  ${(props) =>
    props.fontColor ? `color : ${props.fontColor}` : `color : #ffffff`};
  /* padding: 15px 0px; */
  ${(props) => props.padding ? `padding : ${props.pading}` : `padding : 15px 0px`};
  box-sizing: border-box;
  border: ${(props) => (props.border ? `${props.border}` : "none")};
  ${(props)=>props.margin ? `margin : ${props.margin}` : null};
`;

const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  ${(props) =>
    props.btnColor
      ? `background-color : ${props.btnColor}`
      : `background-color : #212121`};
  ${(props) =>
    props.fontColor ? `color : ${props.fontColor}` : `color : #ffffff`};
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 16px;
  text-align: center;
  border: none;
  border-radius: 50px;
  vertical-align: middle;
`;

export default Button;
