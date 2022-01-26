import { Token } from "../models/token.model.js";
import { checkValidationPhone, getToken, sendToken2SMS } from "./sevices/token_services/phone.js";

export class TokenController {
  getToken = async (req, res) => {
    console.log(res);
    const result = await Token.find();
    res.send(result);
    return;
  };

  postToken =  async (req, res) => {
    // console.log("=====req.body=====");
    // console.log(req.query);
    // const phone = req.query.phone;
    console.log(req.body);
    const phone = req.body.phone;
    // 1. 휴대폰 번호 자리수 확인
    if (!checkValidationPhone(phone)) { 
      res.send(false);
      return;
    }
    const myToken = getToken(6);
    // 3. 휴대폰 번호에 토큰 전송, 위치 다시 생각해보자
    // sendToken2SMS(phone, myToken); // 진짜로 쓸 때만 주석 해제
  
    // 입력받은 폰번호랑 같은 객체 찾는다.
    const prevTokenPhone = await Token.findOne({ phone: phone });
  
    // 이미 있다면 최신 토큰으로 덮어씌우기
    if (prevTokenPhone) {
      prevTokenPhone.token = myToken;
      await prevTokenPhone.save();
      await Token.updateOne({ phone: phone }, { token: myToken });
      res.send(true);
      return;
    }
  
    const token = new Token({
      token: myToken,
      phone: phone,
      isAuth: false, // 자동으로 주자.
    });
    await token.save(); // 몽고디비로 저장된다. 좀 기다려줘
    res.send(true);
    return;
  }

  patchToken =  async (req, res) => {
    // const phone = req.query.phone;
    // const token = req.query.token;
    const phone = req.body.phone;
    const token = req.body.token;
    //! 핸드폰 번호 이미 저장됐는지 확인
    const tokenPhone = await Token.findOne({ phone: phone });
  
    // 토큰자체가 디비에 없다면
    if (!tokenPhone) {
      // res.send(false); // false 반환
      res.status(422).send("휴대폰 인증하세요.");
      return;
    }
  
    //! 발급한 토큰과 일치하는지 확인
    if (tokenPhone.token !== token) {
      console.log(tokenPhone);
      res.status(422).send("토큰 인증이 올바르지 않습니다.");
      return;
    } else {
      console.log(tokenPhone);
  
      await Token.updateOne({ phone: phone }, { isAuth: true });
      res.send(true);
      return;
    }
  }
}
