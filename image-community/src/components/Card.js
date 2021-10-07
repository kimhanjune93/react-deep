import React from "react";
import {Image, Grid, Text } from "../elements";

import {history} from "../redux/configureStore";
const Card = (props) => {
    const {image_url, user_name, post_id} = props;
    return (
        <React.Fragment>
            <Grid _onClick ={()=>{history.push(`/post/${post_id}`)}}is_flex padding="16px" bg="#ffffff" margin="8px 0px" >
                    <Grid width = "auto" bg="red" margin ="0px 8px 0px 0px">
                        <Image size="85" src={image_url}/>
                    </Grid>
                    <Grid>
                        <Text>
                            <b>{user_name}</b>님이 게시글에 댓글을 남겼습니다:)
                        </Text>
                    </Grid>
                </Grid>
        </React.Fragment>
    );
}

Card.defaultProps = {
    image_url : "",
    user_name : "",
    post_id : null,
};

export default Card;