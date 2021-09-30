//Post.js
import React from "react";
import {Grid,Image,Text} from "../elements";

const Post = (props) => {
    return (
        <React.Fragment>
            <Grid>
                <Grid is_flex>
                    <Image shape = "circle" src={props.src} />
                    <Text bold>{props.user_info.user_name}</Text>
                    <Text>{props.insert_dt}</Text>
                </Grid>
                <Grid padding = "16px">
                    <Text>{props.contents}</Text>
                </Grid>
                <Grid>
                    <Image shape = "rectangle" src = {props.src}/>
                </Grid>
                <Grid padding = "16px">
                    <Text bold>댓글 {props.comment_cnt}개</Text>
                </Grid>
            </Grid>
            <div>userprofile / user name / insert_dt </div>
            <div>contents</div>
            <div>Image</div>
            <div>comment cnt</div>
        </React.Fragment>
    )
}

Post.defaultProps = {
    user_info: {
        user_name: "june",
        user_profile : "https://newsimg.hankookilbo.com/cms/articlerelease/2017/01/22/201701222050082111_1.jpg",
    },
    image_url : "https://newsimg.hankookilbo.com/cms/articlerelease/2017/01/22/201701222050082111_1.jpg",
    contents : "지방이네요",
    comment_cnt : 10,
    insert_dt : "2021-09-30 10:00:00"

};

export default Post;