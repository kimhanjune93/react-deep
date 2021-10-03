import React from "react";
import Rect from "react";
import {Button } from "../elements";
import {storage} from "./firebase";
import {useDispatch,useSelector} from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";

const Upload = () => {
    const dispatch = useDispatch();
    const is_uploading = useSelector(state=>state.image.uploading);
    const fileInput = React.useRef();
    const selectFile = (e) => {
        console.log(e);
        console.log(e.target);
        console.log(e.target.files[0]);

        console.log(fileInput.current.files[0]);
    };
    const uploadFB = () => {
        let image = fileInput.current.files[0];
        dispatch(imageActions.uploadImageFB(image));
    };
    return(
        <React.Fragment>
            <input type="file" onChange = {selectFile} ref = {fileInput} disabled = {is_uploading}/>
            <Button text = "업로드하기" _onClick={uploadFB}/>
        </React.Fragment>
    );
}

export default Upload;