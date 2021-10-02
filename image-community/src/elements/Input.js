// label, placeHolder
import React from "react";
import {Grid, Text} from "./index";
import styled from "styled-components";
const Input =(props)=> {
    const {multiLine,placeholder, label, _onChange, type} = props;

    if(multiLine) {
        return (
            <Grid>
                <Text margin="0px">{label}</Text>
                <ElTextarea placeholder={placeholder} onChange={_onChange} rows={5}></ElTextarea>
            </Grid>
        )
    }
    return (
        <React.Fragment>
            <Grid>
                <Text margin="0px">{label}</Text>
                <ElInput type={type} placeholder={placeholder} onChange={_onChange}/>
            </Grid>
        </React.Fragment>
    );
}
Input.defaultProps = {
    multiLine : false,
    label : '',
    placeholder : '텍스트를 입력해주세요',
    type : "text",
    _onChange:() => {},
}

const ElTextarea = styled.input`
    /* border : 1px solid #212121; */
    width : 100%;
    padding : 12px 4px;
    box-sizing: border-box;
`;

const ElInput = styled.input`
    /* border : 1px solid #212121; */
    width : 100%;
    padding : 12px 4px;
    box-sizing: border-box;
`;

export default Input;