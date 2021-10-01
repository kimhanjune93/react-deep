import React from "react";
import { Grid, Button, Text } from "../elements";
import {getCookie, deleteCookie} from "../shared/Cookie";
const Header = (props) => {
  const [is_login, setIsLogin] = React.useState(false);

  React.useEffect(()=>{
    let cookie = getCookie("USER_ID");
    console.log(cookie);

    if(cookie) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  });
  if (is_login) {
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
              _onClick={()=>{deleteCookie("USER_ID");}}
            ></Button>
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
        <Grid is_flex>
          <Button
            btnColor="#eee"
            fontColor="#212121"
            border="1px solid black"
            text="로그인"
          ></Button>
          <Button
            btnColor="#eee"
            fontColor="#212121"
            border="1px solid black"
            text="회원가입"
          ></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
Header.defaultProps = {};

export default Header;
