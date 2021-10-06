import React from "react";
import { Grid, Button, Image, Text } from "../elements";

import { useSelector, useDispatch } from "react-redux";
import {actionCreators as commentActions} from "../redux/modules/comment";
const CommentList = (props) => {
  const dispatch = useDispatch();
  const comment_list=useSelector(state=>state.comment.list);
  const {post_id} = props;
  React.useEffect(()=>{
    if(!comment_list[post_id]) {
      dispatch(commentActions.getCommentFB(post_id));
    }

  },[]);
  if(!comment_list[post_id] || !post_id) {
    return null;
  }
  return (
    <React.Fragment>
      <Grid padding="16px">
        {comment_list[post_id].map(c=> {
          return <CommentItem key={c.id} {...c}/>
        })}
        
      </Grid>
    </React.Fragment>
  );
};
CommentList.defaultProps = {
  post_id: null,
}
export default CommentList;

const CommentItem = (props) => {
  const{user_name,user_id,user_profile, contents, insert_dt} = props;
  return (
    <React.Fragment>
      <Grid is_flex margin ="0px">
        <Grid is_flex width="auto">
          <Image shape="circle"/>
          <Text bold>{user_name}</Text>
        </Grid>
        <Grid is_flex margin ="0px 4px">
          <Text margin="0px">{contents}</Text>
          <Text margin="0px">{insert_dt}</Text>
        </Grid>
          {/* <Image shape="circle" src={props.src} />
          <Text bold>june</Text>
          <Text bold>지방이 귀엽다</Text>
          <Button
            btnColor="#eee"
            fontColor="#212121"
            width="12%"
            padding="20px"
            margin="0px 0px 0px 10px"
            text="삭제"
          /> */}
        </Grid>
    </React.Fragment>
  );
}

CommentItem.defaultProps={
  user_profile:"",
  user_name:"june",
  user_id:"",
  post_id : 1,
  contents : "귀여운 지방이네요",
  insert_dt : '2021-01-01 19:00:00'
};

