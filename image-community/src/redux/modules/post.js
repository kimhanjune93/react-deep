import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

const setPost= createAction(SET_POST, (post_list) => ({post_list}));
const addPost = createAction(ADD_POST, (post_list)=>({post_list}));

const initialState ={
    list : [],
};

const initialPostState = {
    id : 0,
    user_info: {
        user_name: "june",
        user_profile : "https://newsimg.hankookilbo.com/cms/articlerelease/2017/01/22/201701222050082111_1.jpg",
    },
    image_url : "https://newsimg.hankookilbo.com/cms/articlerelease/2017/01/22/201701222050082111_1.jpg",
    contents : "지방이네요",
    comment_cnt : 10,
    insert_dt : "2021-09-30 10:00:00"
};

export default handleActions({
    [SET_POST] : (state, action) => produce(state, (draft) => {

    }),
    [ADD_POST] : (state, action) => produce(state, (draft)=> {

    }),
});