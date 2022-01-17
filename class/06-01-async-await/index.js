import axios from "axios";
 
function fetchPost(){
    const result =  axios.get('https://koreanjson.com/posts/1');
    console.log(result); // Promise {<pending>}
}
async function fetchPost2(){ 
    // 기다려라, 동기식
    const result =  await axios.get('https://koreanjson.com/posts/1');
    console.log(result.data);  
}

// fetchPost();
fetchPost2();