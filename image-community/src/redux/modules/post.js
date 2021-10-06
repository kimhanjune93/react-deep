import { createAction, handleActions } from "redux-actions";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  limit,
  startAt,
} from "firebase/firestore";
import { produce } from "immer";
import moment from "moment";
import { db } from "../../shared/firebase";
import { storage } from "../../shared/firebase";
import user from "./user";
import { actionCreators as imageActions } from "./image";

// import { collection, doc, setDoc } from "firebase/firestore";
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING";

const setPost = createAction(SET_POST, (post_list,paging) => ({ post_list, paging }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const loading = createAction(LOADING, (is_loading) => ({is_loading}));

const initialState = {
  list: [],
  paging: {start: null, next: null, size:3},
  is_loading : false,
};
const initialPostState = {
  // id: 0,
  // user_info: {
  //   user_name: "june",
  //   user_profile:
  //     "https://newsimg.hankookilbo.com/cms/articlerelease/2017/01/22/201701222050082111_1.jpg",
  // },
  image_url:
    "https://newsimg.hankookilbo.com/cms/articlerelease/2017/01/22/201701222050082111_1.jpg",
  contents: "지방이네요",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};
const editPostFB = (post_id = null, post = {}) => {
  return async function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log("게시물 정보가 없습니다.");
      return;
    }
    const _image = getState().image.preview;
    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx];

    const postDB = doc(db, "post", post_id);
    if (_image === _post.image_url) {
      await updateDoc(postDB, post);
      dispatch(editPost(post_id, post));
      history.replace("/");
    } else {
      const user_id = getState().user.user.uid;
      const _upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .putString(_image, "data_url");
      _upload.then((snapshot) => {
        /////////3
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            return url;
          })
          .then((url) => {
            ///////4
            updateDoc(postDB, { ...post, image_url: url });
            dispatch(editPost(post_id, { ...post, image_url: url }));
            history.replace("/");
          }) ////////3
          .catch((err) => {
            window.alert("이미지 업로드에 문제가 있어요");
            console.log("이미지 업로드에 문제가 있어요".err);
          });
      });
    }
  };
};

const addPostFB = (contents = "") => {
  return function (dispatch, getState, { history }) {
    const _user = getState().user.user;
    const user_info = {
      ////// 1
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    }; ///////  1
    const _post = {
      /////// 2
      ...initialPostState,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    }; ////// 2

    const _image = getState().image.preview;

    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");
    _upload
      .then((snapshot) => {
        /////////3
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            return url;
          })
          .then((url) => {
            ///////4
            const docRef = addDoc(collection(db, "post"), {
              ...user_info,
              ..._post,
              image_url: url,
            }).then((doc) => {
              let post = {
                user_info,
                ..._post,
                id: doc.id,
                image_url: url,
              };
              dispatch(addPost(post));
              history.replace("/");

              dispatch(imageActions.setPreview(null));
            });
          }) ////////4
          .catch((err) => {
            window.alert("post 작성에 실패했어요");
            console.log("post 작성에 실패했어요", err);
          });
      }) ////////3
      .catch((err) => {
        window.alert("이미지 업로드에 문제가 있어요");
        console.log("이미지 업로드에 문제가 있어요".err);
      });
    //
    // const docRef = await addDoc(collection(db, "post"), {
    //   ...user_info,
    //   ..._post,
    // });

    // let post ={
    //   user_info,
    //   ..._post,
    //   id: docRef.id,
    // };
    // dispatch(addPost(post));
    // history.replace("/");
  };
};

const getPostFB = (start=null, size=3) => {
  return async function (dispatch, getState, { history }) {

    let _paging=getState().post.paging;
    if(_paging.start && !_paging.next) {
      return;
    }
    dispatch(loading(true));
    // const docs = await getDocs(collection(db, "post"));
    const postDB = collection(db,"post");
    let q = "" //
    if(start) {
      q=query(postDB, orderBy("insert_dt", "desc"),startAt(start), limit(size+1));
    }
    else {
      q=query(postDB, orderBy("insert_dt", "desc"), limit(size+1));
    }
    
    
    const docs = await getDocs(q);
    let post_list = [];
    let paging = {
      start : docs.docs[0],
      next:docs.docs.length === size+1?docs.docs[docs.docs.length-1] : null,
      size : size,
    }
    docs.forEach((doc) => {
      let _post = doc.data();
      let postArray = Object.keys(_post);
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
      post_list.push(post);
    });
    post_list.pop();
    dispatch(setPost(post_list, paging));
  };
};

//reducer
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
        draft.paging = action.payload.paging;
        draft.loading = false;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        // immer 덕에 불변성 생각 안해도됨
        // 제일 앞에 넣기위해 unshift   (push로 넣게되면 제일 뒤에 들어감.)
        draft.list.unshift(action.payload.post);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        console.log(action);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
    [LOADING] : (state,action) => produce(state,(draft) => {
      draft.is_loading = action.payload.is_loading;
    })
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  editPost,
  getPostFB,
  addPostFB,
  editPostFB,
};

export { actionCreators };
