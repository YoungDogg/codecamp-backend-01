// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector("#ValidationInputWrapper").style.display = "flex";
  let phoneFromFrontEnd = ""; 
  for(let i = 0; i < 3; i++){
    phoneFromFrontEnd += document.getElementById("PhoneNumber0" + (i+1)).value; // 번호 가져오기
  }
  // console.log("phoneFromFrontEnd : " + phoneFromFrontEnd);
  axios
    .post("http://localhost:3000/tokens/phone", {
      myphone: phoneFromFrontEnd,
    })
    .then((res) => {
      let data = res.data; 
      console.log(data)
      console.log("signup.js getValidationNumber() data : " + data);
    });
};


// 회원 가입 API 요청
const submitSignup = async () => {
  console.log("signup.js submitSignup() 회원 가입 이메일 전송");
  // 이름 SignupName
  let SignupName = document.getElementById("SignupName").value;
  // 주민번호 SignupPersonal
  let SignupPersonalpart1 = document.getElementById("SignupPersonal1").value;
  let SignupPersonalpart2 = document.getElementById("SignupPersonal2").value;
  let SignupPersonal = SignupPersonalpart1 + "-" + SignupPersonalpart2;
  // 휴대폰 번호
  let phone = ""; 
  for(let i = 0; i < 3; i++){
    phone += document.getElementById("PhoneNumber0" + (i+1)).value; // 번호 가져오기
  }
  //좋아하는 사이트
  SignupPrefer = document.getElementById("SignupPrefer").value;

  // 이메일
  let SignupEmail = document.getElementById("SignupEmail").value;
  // 비밀번호
  let SignupPwd = document.getElementById("SignupPwd").value;

  const user = {
    name : SignupName,
    socialSecurityNum : SignupPersonal,
    phone : phone,
    SignupPrefer : SignupPrefer,
    email : SignupEmail,
    SignupPwd : SignupPwd
  }

  console.log("user");
  console.log(user);

  axios
    .post("http://localhost:3000/users", {
      user: user
    })
};
