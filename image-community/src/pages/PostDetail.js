import React from "react";
import Post from "../components/Post";
import CommentWrite from "../components/CommentWrite";
import CommentList from "../components/CommentList";
import {doc, query, where, getDoc} from "firebase/firestore";
import { useSelector } from "react-redux";
import {db} from "../shared/firebase";
const PostDetail = (props) => {
  const id=props.match.params.id;
  const post_list=useSelector(store => store.post.list);
  const user_info = useSelector(state => state.user.user);
  const post_idx = post_list.findIndex(p=>p.id === id);
  const post_data = post_list[post_idx];
  const [post, setPost] = React.useState(post_data? post_data : null);

  React.useEffect(()=> {
    if(post) {
      return;
    }
    return async function() {
    const postDB = doc(db, "post",id);
    const postDoc = await getDoc(postDB);
    let _post = postDoc.data();
    let post = Object.keys(_post).reduce(
      // reduce 누산기
      (acc, cur) => {
        if (cur.indexOf("user_") !== -1) {
          return {
            ...acc,
            user_info: { ...acc.user_info, [cur]: _post[cur] },
          };
        }
        return { ...acc, [cur]: _post[cur] };
      },
      { id: doc.id, user_info: {} }
    );
    setPost(post);
    }
    // query(postDB, where("","",""))
  });

  return (
    <React.Fragment>
      {post && <Post {...post} is_me={post.user_info.user_id === user_info.uid}/>}
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
