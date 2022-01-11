import { getWelcomeTemplate } from "./email.js";

function createUser({name, age, school, email}){
    // 1. email이 정상인지 확인(eamil 존재 여부, @포함여부)
    if(email === undefined || !email.split("").includes("@")){
        console.log(email);
        console.log("이메일 다시 쓰세요");
    }else{
        // 2. 가입환영 템플릿 만들기
        getWelcomeTemplate({name, age, school});
        // 3. 이메일에 가입환영 템플릿 전송하기
        console.log(`${name}님,  반갑습니다.`);
    }

}
const myuser = {
    name :"철수",
    age : 8,
    school : "람쥐초등학교",
    email : "a@a.com"
}
createUser(myuser);