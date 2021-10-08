import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import { Grid, Button, Text } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";
import { apiKey } from "./firebase";
import { history } from "../redux/configureStore";
import NotiBadge from "../components/NotiBadge";

const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  if (is_session && is_login) {
    return (
      <React.Fragment>
        <Grid is_flex padding="4px 16px">
          <Grid is_flex>
            <Text size="24px" margin="0px" bold>
              하이
            </Text>
          </Grid>
          <Grid is_flex width="15%">
            {/* <Button
              btnColor="#eee"
              fontColor="#212121"
              border="1px solid black"
              text="내정보"
            ></Button> */}
            {/* <Button
            btnColor="#eee"
            fontColor="#212121"
            border="1px solid black"
            text="알림"
            _onClick={() => {
              history.push("/noti");
            }}
          ></Button> */}
            <NotiBadge 
            _onClick ={() => {history.push("/noti");}}/>
            <LogoutIcon
            onClick={() => {
              dispatch(userActions.logoutFB());
            }}/>
            {/* <Button
              btnColor="#eee"
              fontColor="#212121"
              border="1px solid black"
              text="로그아웃"
              _onClick={() => {
                dispatch(userActions.logoutFB());
              }}
            ></Button> */}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Grid is_flex padding="4px 16px">
        <Grid is_flex>
          <Text size="24px" margin="0px" bold>
            하이
          </Text>
        </Grid>
        <Grid is_flex width ="15%">
          {/* <Button
            btnColor="#eee"
            fontColor="#212121"
            border="1px solid black"
            text="로그인"
            _onClick={() => {
              history.push("/login");
            }}
          ></Button> */}
          <LoginIcon onClick={() => {
              history.push("/login");
            }}/>
          {/* <Button
            btnColor="#eee"
            fontColor="#212121"
            border="1px solid black"
            text="회원가입"
            _onClick={() => {
              history.push("/signup");
            }}
          ></Button> */}
          <PersonAddIcon onClick={() => {
              history.push("/signup");
            }}/>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
Header.defaultProps = {};

export default Header;
