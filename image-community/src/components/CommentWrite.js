import React from "react";
import { Grid, Button, Input } from "../elements";
const CommentWrite = () => {
    return (
    <React.Fragment>
        <Grid is_flex padding = "0px 16px">
            <Input placeholder = "댓글 내용을 입력해주세요 :)"/>
            <Button btnColor="#eee"
            fontColor="#212121"
            width ="12%"
            padding = "20px"
            margin = "0px 0px 0px 10px"
            text = "작성"/>
        </Grid>
    </React.Fragment>
    );
}
export default CommentWrite;