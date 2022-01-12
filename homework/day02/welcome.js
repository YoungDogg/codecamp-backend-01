export const welcome = ({ name, email, ssn, phone, siteILike, liveAt }) => {
    return ` 
    ${name}님 회원가입 축하합니다!
    당신의 이메일은 ${email} 이고
    주민번호는 ${ssn} 이며
    전화번호는 ${phone},
    ${siteILike}에 자주 접속하며 
    ${liveAt}에 살고 있네요. 
    감사합니다. 
      `;
  };