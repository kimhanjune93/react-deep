import React from "react";
import { Input, Text, Grid, Button } from "../elements";
import {getCookie, setCookie, deleteCookie} from "../shared/Cookie";
const Login = (props) => {
  const [id,setId] = React.useState('');
  const [pwd,setPwd] = React.useState('');
  const changeId= (e) => {
    setId(e.target.value);
  }

  const changePwd= (e) => {
    setPwd(e.target.value);
  }

  const login =() => {
    setCookie("USER_ID",id,3);
    setCookie("USER_PWD",pwd,3);
  }

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text bold size="35px">
          로그인
        </Text>
        <Grid padding="16px 0px">
          <Input
            value={pwd}
            label="아이디"
            placeholder="아이디를 입력해주세요."
            _onChange={changeId}
          />
        </Grid>
        <Grid padding="16px 0px">
          <Input
            value={pwd}
            label="패스워드"
            placeholder="암호를 입력해주세요."
            _onChange={changePwd}
          />
        </Grid>
        <Button text="로그인하기" _onClick = {login}/>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
