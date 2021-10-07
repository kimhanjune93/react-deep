import React from "react";
import Post from "../components/Post";
import CommentWrite from "../components/CommentWrite";
import CommentList from "../components/CommentList";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { Grid } from "../elements";

import Permit from "../shared/Permit";
const PostDetail = (props) => {
  const id = props.match.params.id;
  const post_list = useSelector((store) => store.post.list);
  const user_info = useSelector((state) => state.user.user);
  const post_idx = post_list.findIndex((p) => p.id === id);
  const post = post_list[post_idx];
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (post) {
      return;
    }
    dispatch(postActions.getOnePostFB(id));
  }, []);

  return (
    <React.Fragment>
      <Grid bg="#EFF6FF" padding="20px 0px">
      <Grid bg="#ffffff">
        {post && (
          <Post {...post} is_me={post.user_info.user_id === user_info?.uid} />
        )}
          <Permit>
            <CommentWrite post_id={id} />
          </Permit>
          <CommentList post_id={id} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
PostDetail.defaultProps = {
  user_info: {
    user_name: "june",
    user_profile:
      "https://newsimg.hankookilbo.com/cms/articlerelease/2017/01/22/201701222050082111_1.jpg",
  },
  image_url:
    "https://newsimg.hankookilbo.com/cms/articlerelease/2017/01/22/201701222050082111_1.jpg",
  contents: "지방이네요",
  comment_cnt: 10,
  insert_dt: "2021-09-30 10:00:00",
};

export default PostDetail;
