import {
  sendTempToEmail,
  getWelcomeTemplate,
} from "./sevices/users_services/email.js";
import { getOpenGraph } from "./sevices/users_services/getOG.js";
import { Users } from "../models/users.model.js";
import { Token } from "../models/token.model.js";

export class UsersController {
  getUsers = async (req, res) => {
    const result = await Users.find();
    console.log(result);
    res.send(result);
    return;
  };

  postUsers = async function (req, res) {
    let { name, email, personal, phone, favoriteSite, password, isAuth } = req.body;

    // Swagger try out에 기능이 작동되게 try-catch문 없앴다. - swagger용이 아니라서 주석해제
    let tokenPhone;
    let isAuthFromDB;
    try {
      // 휴대폰 인증전송 버튼을 누르지 않았을 경우, 에러를 보낸다
      tokenPhone = await Token.findOne({ phone: phone });
      isAuthFromDB = tokenPhone.isAuthFromDB;
      console.log(`tokenPhone: ${tokenPhone}, isAuthFromDB: ${isAuthFromDB}`);
    } catch (err) {
      res.status(422).send("에러!!! 핸드폰 번호가 인증되지 않았습니다. 인증전송 버튼을 누르세요.");
      return;
    }
    // 1. email이 정상인지 확인(eamil 존재 여부, @포함여부)
    if (email === undefined || !email.split("").includes("@")) {
      res.send("이메일 형식이 올바르지 않습니다.");
      return;
    }
    if (!isAuthFromDB ) { // || isAuthFromDB !== isAuth -> token_controller.js tokenPatch에서 둘이 같은지 보내고 있다. 따라서 
      console.log("토큰 인증이 올바르지 않습니다.");
      return;   // 여기 리턴이 되는데 왜 아래 엘스문으로 들어갈까?, tockenPatch를 바꾸니 잘 됐다.
    } else {
      const ogs = await getOpenGraph(favoriteSite);

      const user = new Users({
        name: name,
        email: email,
        personal: personal.substring(0, 6) + "-*******",
        phone: phone,
        favoriteSite: favoriteSite,
        password: password,
        og: {
          title: ogs.title,
          description: ogs.description,
          image: ogs.image,
        },
      });
      sendTempToEmail(
        name,
        email,
        getWelcomeTemplate(name, personal, favoriteSite)
      );

      await user.save(); // 몽고디비로 저장된다. 좀 기다려줘

      console.log("=====================user._id=============");
      console.log(user._id);
      res.send(user._id);
      return;
    }
  };
}
