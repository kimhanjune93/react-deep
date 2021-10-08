//Post.js
import React from "react";
import { Grid, Image, Text, Button } from "../elements";
import { history } from "../redux/configureStore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EditIcon from "@mui/icons-material/Edit";
import { actionCreators as postActions } from "../redux/modules/post";
import {useDispatch, useSelector} from "react-redux";
const Post = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector(store=>store.post.list);
  const post_idx = post_list.findIndex((p)=> p.id ===props.id);
  const post = post_list[post_idx];
  const [is_like, setIsLike] = React.useState(false);
  const user = useSelector(state => state.user.user);
  const like = (e) => {
    dispatch(postActions.addPostLikeFB(props.id));
    if (is_like===true || !user){
      setIsLike(false);
    }
    else {
      setIsLike(true);
    }
    e.stopPropagation();
  }
  React.useEffect(() => {
    setIsLike(post.is_like);
  },[post]);

  React.useEffect(()=> {
    dispatch(postActions.getPostLikeFB(props.id));
  },[]);
  
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
                onClick={() => {
                  history.push(`/write/${props.id}`);
                }}
              />
            )}
          </Grid>
        </Grid>
        <Grid padding="16px">
          <Text>{props.contents}</Text>
        </Grid>
        <Grid>
          <Image shape="rectangle" src={props.image_url} />
        </Grid>
        <Grid padding="16px" is_flex>
           <Grid> 
            <Text margin="0px" bold>
              댓글 {props.comment_cnt}개
            </Text>
          </Grid> 
           <Grid width = "20%" is_flex> 
             <Text>좋아요 {post.like_cnt}개</Text> 
             {is_like===true?<FavoriteIcon onClick = {like}/> : <FavoriteBorderIcon onClick = {like}/>} 
            
           </Grid> 
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
