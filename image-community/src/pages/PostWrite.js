import React from "react";
import { Grid, Image, Text, Input, Textarea, Button } from "../elements";
import Upload from "../shared/Upload";
const PostWrite = (props) => {
    console.log(props);
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
            <Input multiLine label ="게시글 내용" placeholder="게시글 작성"/>
            <Button text ="게시글 작성" margin="10px 0px 0px 0px"/>
        </Grid>
    </React.Fragment>
    );
}
export default PostWrite;