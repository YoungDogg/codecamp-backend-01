// 1. 회원가입을 축하하는 형태의 템플릿을 출력하는 함수를 만들어 주세요.
//     1. **이메일**, **주민번호**, **휴대폰 번호**, **내가 좋아하는 사이트**를 함수의 입력으로 받고, 해당 내용이 템플릿에 포함되어 콘솔에 출력되어야합니다.
//     2. 콘솔에 출력된 화면의 캡쳐본과 코드가 적힌 파일을 클래스룸에 제출해주세요.

const welcome = ({ name, email, ssn, phone, siteILike, liveAt }) => {
  console.log(`
    ${name}님 회원가입 축하합니다!
    당신의 이메일은 ${email} 이고
    주민번호는 ${ssn} 이며
    전화번호는 ${phone},
    ${siteILike}에 자주 접속하며 
    ${liveAt}에 살고 있네요. 
    감사합니다.
    `);
};
const aMan = {
  name: "Sumin",
  email: "aa@aa.com",
  ssn: "021232-4433029",
  phone: "010-3302-2033",
  siteILike: "netflix.com",
  liveAt: "Jeju-Si",
  hasCar: true,
  hasPet: "dog",
};
welcome(aMan);