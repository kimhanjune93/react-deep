import React from "react";
import { Grid, Text, Input, Button } from "../elements";
const Signup = () => {
  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text bold size="35px">
          회원가입
        </Text>
        <Grid padding="16px 0px">
          <Input label="아이디" placeholder="아이디를 입력하세요" />
          </Grid>
          <Grid padding="16px 0px">
          <Input label="닉네임" placeholder="닉네임를 입력하세요" />
          </Grid>
          <Grid padding="16px 0px">
          <Input label="비밀번호" placeholder="비밀번호를 입력하세요" />
          </Grid>
          <Grid padding="16px 0px"> 
          <Input
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력하세요"
          />
          </Grid>
        <Button text="회원가입하기" />
      </Grid>
    </React.Fragment>
  );
};

export default Signup;
