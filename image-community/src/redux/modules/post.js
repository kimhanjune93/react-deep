import { createAction, handleActions } from "redux-actions";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { produce } from "immer";
import moment from "moment";
import { db } from "../../shared/firebase";
import user from "./user";

// import { collection, doc, setDoc } from "firebase/firestore";
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

const initialState = {
  list: [],
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

const addPostFB = (contents="",) => {
  return async function (dispatch, getState, { history }) {
    const _user = getState().user.user;
    const user_info = {
      user_name : _user.user_name,
      user_id : _user.id,
      user_profile : _user.user_profile,
    }
    const _post = {
      ...initialPostState,
      contents : contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    }
    // 
    const docRef = await addDoc(collection(db, "post"), {
      ...user_info,
      ..._post,
    });

    let post ={
      user_info,
      ..._post,
      id: docRef.id,
    };
    dispatch(addPost(post));
    history.replace("/");
  };
};

const getPostFB = () => {
  return async function (dispatch, getState, { history }) {
    const docs = await getDocs(collection(db, "post"));
    let post_list = [];
    docs.forEach((doc) => {
      let _post = doc.data();
      let postArray = Object.keys(_post);
      console.log(postArray);
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
      //   let _post = {
      //       id:doc.id,
      //       ...doc.data()
      //   };

      //   let post ={
      //       id :doc.id,
      //       user_info: {
      //         user_name: _post.user_name,
      //         user_profile: _post.user_profile,
      //       },
      //       image_url:_post.image_url,
      //       contents: _post.contents,
      //       comment_cnt: _post.comment_cnt,
      //       insert_dt: _post.insert_dt,
      //   };

      post_list.push(post);
    });
    // console.log(post_list);

    dispatch(setPost(post_list));
  };
};

//reducer
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
    [ADD_POST]: (state, action) => produce(state, (draft) => {
      // immer 덕에 불변성 생각 안해도됨
      // 제일 앞에 넣기위해 unshift   (push로 넣게되면 제일 뒤에 들어감.)
      draft.list.unshift(action.payload.post);
    }),
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB,
};

export { actionCreators };
