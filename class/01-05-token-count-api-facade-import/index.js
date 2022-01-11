import {checkValidationPhone, getToken, sendToken2SMS} from './phone.js' 

// API 만들기
function createTokenOfPhone(myphone){
    // 1. 휴대폰 번호 자리수 확인 
    checkValidationPhone(myphone);
    // 2. 토큰 6자리 만들기 
    const myToken = getToken(6);
    // 3. 휴대폰 번호에 토큰 전송 
    sendToken2SMS(myphone, myToken);
}



//API 실행하기
createTokenOfPhone("01033334444"); 