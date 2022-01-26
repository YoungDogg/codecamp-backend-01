import { Users } from "../models/user.model.js";
import { getOpenGraph } from "./sevices/getOG.js";
import { getWelcomeTemplate, sendTempToEmail } from "./sevices/email.js";

export class UserController {
  getUser = async (req, res) => {
    const result = await Users.find();
    res.send(result);
    return;
  };

  postUser = async (req, res) => {
    let { name, email, personal, phone, favoriteSite, password } = req.body;
    // 1. email이 정상인지 확인(eamil 존재 여부, @포함여부)
    if (email === undefined || !email.split("").includes("@")) {
        console.log("====================email================");
        return;
    }
    
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
      }
    });
    sendTempToEmail(name, email, getWelcomeTemplate(name, personal, favoriteSite));

    await user.save(); // 몽고디비로 저장된다. 좀 기다려줘
 
    res.send(user._id);
    return;
 
  };
}
