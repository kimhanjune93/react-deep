//Post.js
import React from "react";
import { Grid, Image, Text, Button } from "../elements";
import {history} from "../redux/configureStore";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
const Post = (props) => {
  const [is_list, setIsLike] = React.useState(false);  
  
  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex>
          <Grid is_flex width="auto">
            <Image shape="circle" src={props.src} />
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>
          <Grid is_flex width="auto">
            <Text>{props.insert_dt}</Text>
            {props.is_me && (
              <EditIcon
              _onClick={() => {
                history.push(`/write/${props.id}`);
            }}/>
            )}
          </Grid>
        </Grid>
        <Grid padding="16px">
          <Text>{props.contents}</Text>
        </Grid>
        <Grid>
          <Image shape="rectangle" src={props.image_url} />
        </Grid>
        <Grid padding="16px">
          <Text margin="0px" bold>
            댓글 {props.comment_cnt}개
          </Text>
          {}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "june",
    user_profile:
      "https://newsimg.hankookilbo.com/cms/articlerelease/2017/01/22/201701222050082111_1.jpg",
  },
  image_url: "",
  contents: "지방이네요",
  comment_cnt: 10,
  insert_dt: "2021-09-30 10:00:00",
  is_me: false,
};

export default Post;
