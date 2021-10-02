import React from "react";
import styled from "styled-components";
import {Text} from "./index";
const Textarea = (props) => {
    const {label, placeholder, _onChange} = props;
    return (
        <React.Fragment>
            <Text size ="12px" margin="0px">{label}</Text>
            <TextArea placeholder={placeholder} onChange={_onChange}>
            </TextArea>
        </React.Fragment>  
    )
}
Textarea.defaultProps = {
    label : '',
    placeholder : '텍스트를 입력해주세요',
    _onChange:() => {},
}
const TextArea = styled.textarea`
    width : 100%;
    height : 100px;
    padding : 10px;
    box-sizing: border-box;
`;
export default Textarea;