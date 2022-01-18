// utils.js 받기
import { getCreatedAt } from "./utils.js";
import axios from "axios";

export function getWelcomeTemplate({ name, phone, SignupPrefer }) {
  const createdAt = getCreatedAt(); // back-end

  return `
        <html>
        <style>
          .makeitred {
            color: red;
          } 
          </style>
            <body>
                <h1>${name}님 반갑습니다.</h1>
                <hr/>
                <div>이름 : ${name}<div/>
                <div >phone : ${phone}<div/>
                <div >SignupPrefer : ${SignupPrefer}<div/>
                <div >가입일 : ${createdAt}<div/>
            </body>
        </html>
        `;
}

export async function sendTempToEmail(email, mytemplate) {
  const appKey = process.env.EMAIL_APP_KEY;
  const XSecretKey = process.env.EMAIL__X_SECRET_KEY;
  const sender = process.env.EMAIL_SENDER;

  const result = await axios.post(
    // ------------ app key, secret key 같은 중요한 건 환경변수로 깃에 올리지 않는다 .env에 간다
    `https://api-mail.cloud.toast.com/email/v2.0/appKeys/${appKey}/sender/mail`, // <-------- 내걸로 바꿀 부분 appkey
    //data, 필수요소 3인방!
    {
      senderAddress: sender,
      title: "[회사이름] 안녕하세요",
      body: mytemplate,
      receiverList: [
        // 받을 사람
        {
          receiveMailAddr: email,
          receiveType: "MRT0",
        }, // , 찍고 여러명 보낼 수 있다.
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

  // console.log("result");
  // console.log(result);
}
