import React from "react";
import { Grid, Button, Text } from "../elements";
const Header = (props) => {
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
