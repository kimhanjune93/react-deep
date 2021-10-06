import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { db } from "../../shared/firebase";
import { collection, query, where, orderBy, getDocs, addDoc ,updateDoc, doc,increment} from "firebase/firestore";
import {actionCreators as postActions} from "./post";
import "moment";
import moment from "moment";

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";

const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: {},
  is_loading: false,
};
const addCommentFB = (post_id=null, contents) => {
    return async function (dispatch, getState, {history}) {
        const user_info = getState().user.user;

        const post= getState().post.list.find(l=>l.id ===post_id);
        let comment = {
            post_id: post_id,
            user_id: user_info.uid,
            user_name: user_info.user_name,
            user_profile: user_info.user_profile,
            contents : contents,
            insert_dt : moment().format("YYYY-MM-DD hh:mm:ss"),
        }
        
        const docRef = await addDoc(collection(db, "comment"),comment);
        console.log(docRef.id);
        comment={...comment, id:docRef.id};
        const _post = await updateDoc(doc(db,"post",post_id), {
            comment_cnt: increment(1),
        });
        dispatch(addComment(post_id, comment));

        if(post) {
            dispatch(postActions.editPost(post_id,{comment_cnt: parseInt(post.comment_cnt) + 1}));
        }
    }
}
const getCommentFB = (post_id = null) => {
  return async function (dispatch, getState, { history }) {
    try {
        
        if (!post_id) {
        return;
        }
        const commentDB = await getDocs(
        query(
            collection(db, "comment"),
            where("post_id", "==", post_id),
            orderBy("insert_dt", "desc")
        )
        );
        
        let list = [];
        commentDB.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
        });
        dispatch(setComment(post_id, list));
    }
    catch (err) {
        console.log('댓글 정보를 가져올 수가 없네요!',err);
    }
  };
};

export default handleActions(
  {
    [SET_COMMENT]: (state, action) => produce(state, (draft) => {
        //let data ={[post_id : com_list, ...]}
        draft.list[action.payload.post_id] = action.payload.comment_list;
    }),
    [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list[action.payload.post_id].unshift(action.payload.comment);
    }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  getCommentFB,
  addCommentFB,
  setComment,
  addComment,
};

export { actionCreators };
