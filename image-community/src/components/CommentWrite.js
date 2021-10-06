import React from "react";
import { Grid, Button, Input } from "../elements";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { useDispatch, useSelector } from "react-redux";
const CommentWrite = (props) => {
  const dispatch = useDispatch();
  const [comment_text, setCommentText] = React.useState();

  const { post_id } = props;
  const onChange = (e) => {
    setCommentText(e.target.value);
  };
  const write = () => {
    dispatch(commentActions.addCommentFB(post_id, comment_text));
    setCommentText("");
  };
  return (
    <React.Fragment>
      <Grid is_flex padding="0px 16px">
        <Input
          placeholder="댓글 내용을 입력해주세요 :)"
          _onChange={onChange}
          value={comment_text}
          onSubmit={write}
          is_submit
        />
        <Button
          btnColor="#eee"
          fontColor="#212121"
          width="12%"
          padding="20px"
          margin="0px 0px 0px 10px"
          text="작성"
          _onClick={write}
        />
      </Grid>
    </React.Fragment>
  );
};
export default CommentWrite;
