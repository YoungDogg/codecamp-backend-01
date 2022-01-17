// function createTokenOfPhone() {
//   // 오버로딩 된 값으로 들어온다. getToken(num)에 undefined 예외처리를 해도
//   console.log("hihihihh"); // 위치를 바꾸니 또 되지 않았다. 자리로 판단되는 건가? 오버로딩은 안되고
// } // 같은 이름 함수면 아래 보다 아래에 있는 함수가 실행된다.

export function checkValidationPhone(myphone) {
  if (myphone.length !== 10 && myphone.length !== 11) {
    console.log("에러 발생! 핸드폰 번호를 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true;
  }
}
export function getToken(num) {
  //   const num = 6;
  if (num === undefined) {
    console.log("error occured num === undefined, type the right number");
    return;
  } else if (num <= 0) {
    console.log("error occured num <= 0 , type the right number");
    return;
  } else if (num > 10) {
    console.log("error occured num > 10, type the right number");
    return;
  }
  const result = String(Math.floor(Math.random() * Math.pow(10, num))).padStart(
    num,
    "0"
  );
  return result;
}

export function sendToken2SMS(myphone, myToken) {
  console.log(`${myphone} 번호로 인증번호 ${myToken}를 전송합니다`);
}
