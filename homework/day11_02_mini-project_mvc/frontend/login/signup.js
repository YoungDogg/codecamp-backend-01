// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector("#ValidationInputWrapper").style.display = "flex";
  console.log("인증 번호 전송");
  let phone = "";
  for (let i = 1; i <= 3; i++) {
    phone += String(document.getElementById(`PhoneNumber0${i}`).value);
  }

  axios
    .post(`http://localhost:3000/tokens/phone`, {
      phone: phone,
    })
    .then((req, res) => {
      console.log("=====================signup.js==================");
      console.log(phone);
    });
};

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
  console.log("핸드폰 인증 API");
  let phone = "";
  for (let i = 1; i <= 3; i++) {
    phone += String(document.getElementById(`PhoneNumber0${i}`).value);
  }
  let token = "";
  token += String(document.getElementById(`TokenInput`).value);
  axios.patch(`http://localhost:3000/tokens/phone`, {
    phone : phone,
    token : token
  });
};

// 회원 가입 API 요청
const submitSignup = async () => {
  let personalInfo = {
    name: String(document.getElementById(`SignupName`).value),
    personal: "",
    phone: "",
    favoriteSite: String(document.getElementById(`SignupPrefer`).value),
    email: String(document.getElementById(`SignupEmail`).value),
    password: String(document.getElementById(`SignupPwd`).value),
  };

  for (let i = 1; i <= 2; i++) {
    personalInfo.personal += String(
      document.getElementById(`SignupPersonal${i}`).value
    );
  }
  phone = "";
  for (let i = 1; i <= 3; i++) {
    personalInfo.phone += String(
      document.getElementById(`PhoneNumber0${i}`).value
    );
  }

  // =====================JS 수업 3일차 때 썼던 for_in문을 썼다=================
  let isGood2Go = false;
  for (let key in personalInfo) {
    if (!personalInfo[key]) {
      isGood2Go = false;

      // =============경고창 나오게 하기 ====================
      let missingAlert = document.createElement("div");
      missingAlert.innerHTML = "빠뜨린 거 있다! : " + key;
      alert(missingAlert.outerHTML);
      return -1;
    } else {
      isGood2Go = true;
    }
    // console.log(key + " : " + personalInfo[key]);
  }

  // 만약 모든 조건이 다 됐다면
  if (isGood2Go) {
    // 쿼리스트링용, 보안문제로 쓰지 않는다
    // let infoParam = "";
    // for (let key in personalInfo) {
    //   infoParam += `${key}=${personalInfo[key]}&`;
    // }
    // // 마지막에 &이 붙어있어서 빼준다.
    // infoParam = infoParam.substring(0, infoParam.length - 1);
    axios
      .post(`http://localhost:3000/users`, {
        name: personalInfo.name,
        personal: personalInfo.personal,
        phone: personalInfo.phone,
        favoriteSite: personalInfo.favoriteSite,
        email: personalInfo.email,
        password: personalInfo.password,
      })
      .then((req, res) => {
        //user : { 객체로 받아온다. 수업시간 }

        console.log("==============");
        console.log("회원 가입 완료");
        CloseModal();
        let okAlert = document.createElement("div");
        okAlert.innerHTML = "회원가입 성공!";
        alert(okAlert.outerHTML);
        return;
      });
  }
};
