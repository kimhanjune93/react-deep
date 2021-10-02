import React from "react";
import Post from "../components/Post";
import CommentWrite from "../components/CommentWrite";
import CommentList from "../components/CommentList";
import { Grid, Image, Text } from "../elements";
const PostDetail = (props) => {
    console.log(props);
  return (
    <React.Fragment>
      <Post/>
      <CommentWrite/>
      <CommentList/>
    </React.Fragment>
  );
}
PostDetail.defaultProps = {
    user_info: {
        user_name: "june",
        user_profile : "https://newsimg.hankookilbo.com/cms/articlerelease/2017/01/22/201701222050082111_1.jpg",
    },
    image_url : "https://newsimg.hankookilbo.com/cms/articlerelease/2017/01/22/201701222050082111_1.jpg",
    contents : "지방이네요",
    comment_cnt : 10,
    insert_dt : "2021-09-30 10:00:00"

};


export default PostDetail;
