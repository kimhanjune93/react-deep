import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { db } from "../../shared/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
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
    [ADD_COMMENT]: (state, action) => produce(state, (draft) => {}),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  getCommentFB,
  setComment,
  addComment,
};

export { actionCreators };
