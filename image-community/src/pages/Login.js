import React from "react";
import { Input, Text, Grid, Button } from "../elements";
const Login = (props) => {
  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text bold size="35px">
          로그인
        </Text>
        <Grid padding="16px 0px">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요."
            _onChange={() => {
              console.log("아이디");
            }}
          />
        </Grid>
        <Grid padding="16px 0px">
          <Input
            label="패스워드"
            placeholder="암호를 입력해주세요."
            _onChange={() => {
              console.log("비번");
            }}
          />
        </Grid>
        <Button text="로그인하기" _onClick = {()=>{console.log("로그인 했어")}}/>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
