import React from "react";
import _ from "lodash";


const Search = () => {
    const [text, setText] = React.useState('');
    const debounce = _.debounce((e)=>{
        console.log("debounce  :::  ",e.target.value);
    },1000);
    const throttle = _.throttle((e)=> {
        console.log("throttle  :::  ",e.target.value);
    },1000);
    const keyPress =React.useCallback(debounce, []); // 함수를 저장해서 컴포넌트가 리렌더링이 되더라도 해당 함수는 초기화하지않게함
    const onChange =(e) => {
        setText(e.target.value);
        keyPress(e);
    }
    
    return (
        <div>
            <input type = "text" onChange = {onChange} value={text}/>
        </div>
    );
}

export default Search;