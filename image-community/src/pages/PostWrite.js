import React from "react";
import { Grid, Image, Text, Input, Textarea, Button } from "../elements";
import Upload from "../shared/Upload";

import {useSelector, useDispatch} from "react-redux";
import {actionCreators as postActions} from "../redux/modules/post";

const PostWrite = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const {history} = props;

    const [contents, setContents] = React.useState("");

    const changeContents = (e) => {
        setContents(e.target.value);
    }
    const addPost = () => {
        dispatch(postActions.addPostFB(contents));
    }
    if(!is_login) {
        return (
            <Grid margin = "100px 0px" padding = "16px" center>
                <Text size="32px" bold>앗! 잠깐</Text>
                <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
                <Button _onClick ={() => {
                    history.replace("/login");
                }} text = "로그인 하러가기"/>
            </Grid>
        )
    }
    return (
    <React.Fragment>
        <Grid padding = "25px 16px">
            <Text bold size="35px"margin="0px">게시글 작성</Text>
            <Upload />
        </Grid>
        <Grid>
            <Text bold size = "20px" margin="0px 0px 0px 16px">미리보기</Text>
            <Image shape = "rectangle" src = {props.src}/>
        </Grid>
        <Grid padding="16px">
            <Input multiLine label ="게시글 내용" placeholder="게시글 작성" _onChange={changeContents}/>
            <Button text ="게시글 작성" margin="10px 0px 0px 0px" _onClick={addPost}/>
        </Grid>
    </React.Fragment>
    );
}
export default PostWrite;