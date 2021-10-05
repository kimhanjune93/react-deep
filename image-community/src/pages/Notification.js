import React from "react";
import Card from "../components/Card";
import { Grid } from "../elements";
const Notification = (props) => {
    const noti=[
        {user_name : "qwer", post_id: "post1",image_url : ""},
        {user_name : "qwer", post_id: "post2",image_url : ""},
        {user_name : "qwer", post_id: "post3",image_url : ""},
        {user_name : "qwer", post_id: "post4",image_url : ""},
        {user_name : "qwer", post_id: "post5",image_url : ""},
        {user_name : "qwer", post_id: "post6",image_url : ""},
    ];
    return (
        <React.Fragment>
            <Grid padding = "16px" bg="#EFF6FF">
                {noti.map((n)=>{
                    return (
                        <Card {...n} key={n.post_id}/>
                    );
                })}
                
            </Grid>
        </React.Fragment>
    );
}

export default Notification;