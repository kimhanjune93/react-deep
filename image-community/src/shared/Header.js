import React from "react";
import {useDispatch,useSelector} from "react-redux";
import { Grid, Button, Text } from "../elements";
import {getCookie, deleteCookie} from "../shared/Cookie";
import { actionCreators as userActions } from "../redux/modules/user";

import {history} from "../redux/configureStore";
import { apiKey } from "./firebase";
import Permit from "./Permit";
const Header = (props) => {
  const is_login = useSelector((state) => state.user.is_login);
  const dispatch = useDispatch();
  
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  console.log(is_session);
  // if (is_login && is_session) {
  //   return (
      
  //   );
  // }
  <Permit>
      <React.Fragment>
        <Grid is_flex padding="4px 16px">
          <Grid is_flex>
            <Text size="24px" margin="0px" bold>
              하이
            </Text>
          </Grid>
          <Grid is_flex>
            <Button
              btnColor="#eee"
              fontColor="#212121"
              border="1px solid black"
              text="내정보"
            ></Button>
            <Button
              btnColor="#eee"
              fontColor="#212121"
              border="1px solid black"
              text="알림"
            ></Button>
            <Button
              btnColor="#eee"
              fontColor="#212121"
              border="1px solid black"
              text="로그아웃"
              _onClick={()=>{
                dispatch(userActions.logoutFB());
              }}
            ></Button>
          </Grid>
        </Grid>
      </React.Fragment>
  </Permit>
  return (
    <React.Fragment>
      <Grid is_flex padding="4px 16px">
        <Grid is_flex>
          <Text size="24px" margin="0px" bold>
            하이
          </Text>
        </Grid>
        <Grid is_flex>
          <Button
            btnColor="#eee"
            fontColor="#212121"
            border="1px solid black"
            text="로그인"
            _onClick = {() => {
              history.push("/login")
            }}
          ></Button>
          <Button
            btnColor="#eee"
            fontColor="#212121"
            border="1px solid black"
            text="회원가입"
            _onClick = {() => {
              history.push("/signup")
            }}
          ></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
Header.defaultProps = {};

export default Header;
