import React from "react";
import { Input, Text, Grid, Button } from "../elements";
import {getCookie, setCookie, deleteCookie} from "../shared/Cookie";
import { useDispatch } from "react-redux";
import {actionCreators as userActions} from "../redux/modules/user"

const Login = (props) => {
  const dispatch = useDispatch();
  const [id,setId] = React.useState('');
  const [pwd,setPwd] = React.useState('');
  const rexEmail=/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const login =() => {
    if(id==="" || pwd==="") {
      window.alert("아이디 혹은 비밀번호가 공란입니다. 입력해주세요");
      return;
    }
    if(!id.match(rexEmail)){
      window.alert("아이디를 이메일 형식으로 입력해주세요")
      return;
    }
    dispatch(userActions.loginFB(id, pwd));
  };

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text bold size="35px">
          로그인
        </Text>
        <Grid padding="16px 0px">
          <Input
            value={id}
            label="아이디"
            placeholder="아이디를 입력해주세요."
            _onChange={(e)=> {
              setId(e.target.value);
            }}
          />
        </Grid>
        <Grid padding="16px 0px">
          <Input
            value={pwd}
            label="패스워드"
            placeholder="암호를 입력해주세요."
            type="password"
            _onChange={(e)=>{
              setPwd(e.target.value);
            }}
            onSubmit={login}
            is_submit
          />
        </Grid>
        <Button text="로그인하기" _onClick = {login}/>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
