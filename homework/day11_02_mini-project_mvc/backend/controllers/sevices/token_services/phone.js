import axios from "axios";

// function createTokenOfPhone() {
//   // 오버로딩 된 값으로 들어온다. getToken(num)에 undefined 예외처리를 해도
//   console.log("hihihihh"); // 위치를 바꾸니 또 되지 않았다. 자리로 판단되는 건가? 오버로딩은 안되고
// } // 같은 이름 함수면 아래 보다 아래에 있는 함수가 실행된다.

export const checkValidationPhone = (myphone) => {
  if (myphone.length !== 10 && myphone.length !== 11) {
    console.log("에러 발생! 핸드폰 번호를 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true;
  }
}

export const getToken = (num) => {
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

export  const sendToken2SMS = async (phoneNumber, tokenNumber) => { // phoneNumber 받는 번호, tokenNumber 인증번호

  const appKey =  process.env.SMS_APP_KEY;
  const senderPhoneNum = process.env.SMS_SENDER;
  const XSecretKey = process.env.SMS_X_SECRET_KEY;

  await axios.post(
    // ------------ app key, secret key 같은 중요한 건 환경변수로 깃에 올리지 않는다 .env에 간다
    `https://api-sms.cloud.toast.com/sms/v3.0/appKeys/${appKey}/sender/sms`, // <-------- 내걸로 바꿀 부분 appkey
    //data, 필수요소 3인방!
    {
      body: "인증번호 : [ " + tokenNumber + " ]",
      sendNo: senderPhoneNum, // 보내는 휴대폰번호
      recipientList: [
        // 받을 사람
        {
          internationalRecipientNo: phoneNumber, // 이 한 줄만 써도 된다
        },
      ],
    },
    //header, config
    {
      headers: {
        "X-Secret-Key": XSecretKey, // <-------- 내걸로 바꿀 부분
        //-----------------------blog 쓸 것-----------------------------------------
        // 키를 큰 따옴표로 한 이유: - 는 큰 따옴표로 감싸야 정상 작동되기 때문
        "Content-Type": "application/json;charset=UTF-8",
        //----------------------------------------------------------------
      },
    }
  );
  console.log("전송 완료");
  console.log(tokenNumber + "보내는 사람, " + phoneNumber + "받는사람");
}
