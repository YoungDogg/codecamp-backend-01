// const express = require('express') // 옛날 import 방식
import express from "express";
import { checkValidationPhone, getToken, sendToken2SMS } from "./phone.js";
import { getWelcomeTemplate, sendTempToEmail } from "./email.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
// const swaggerSpec = swaggerJSDoc(options);
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose"; //몽구스
import { Token } from "./models/token.model.js";
import { Users } from "./models/user.model.js";
import { Starbucks } from "./models/starbucks.model.js";
import cors from "cors";
import { getOpenGraph } from "./getOG.js";  

// const express = require('express');
const app = express();
app.use(express.json()); // json으로 받은걸 보여준다
app.use(cors()); // 모든 주소 다 허용 // app.use(cors({origin})); 특정사이트

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.get("/tokens/phone", function (req, res) {
  console(res);
  res.send([
    {
      phone: "res.query.phone",
      token: "res.query.token",
    },
  ]);
  return;
});

app.post("/tokens/phone", async function (req, res) {
  // console.log("=====req.body=====");
  console.log(req.query);
  const phone = req.query.phone;
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
});

app.patch("/tokens/phone", async function (req, res) {
  const phone = req.query.phone;
  const token = req.query.token;
  //! 핸드폰 번호 이미 저장됐는지 확인
  const tokenPhone = await Token.findOne({ phone: phone }); 

  if (!tokenPhone) {
    // 토큰자체가 디비에 없다면
    res.send(false);
    return;
  } 

  //! 발급한 토큰과 일치하는지 확인
  if (tokenPhone.token !== token) {
    console.log(tokenPhone);
    res.send(false);
    return;
  } else {
    console.log(tokenPhone);

    await Token.updateOne({ phone: phone }, { isAuth: true });
    res.send(true);
    return;
  }
});

app.get("/users", async function (req, res) {
  const result = await Users.find(); 
  console.log(result);
  res.send(result);
  return;
});

app.post("/users", async function (req, res) {
  let { name, email, personal, phone, favoriteSite, password } = req.body;  
  let tokenPhone;
  let isAuth;
  try {
    tokenPhone = await Token.findOne({ phone: phone }); 
    isAuth = tokenPhone.isAuth; 
  } catch (err) { 
    res.status(422).send("에러!!! 핸드폰 번호가 인증되지 않았습니다.");
    return;
  }
  // 1. email이 정상인지 확인(eamil 존재 여부, @포함여부)
  if (email === undefined || !email.split("").includes("@")) { 
    return;
  } else {
    if (!isAuth) { 
      return;
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
      sendTempToEmail(name, email, getWelcomeTemplate(name, personal, favoriteSite));
      
      await user.save(); // 몽고디비로 저장된다. 좀 기다려줘
      
      console.log("=====================user._id=============")
      console.log(user._id)
      res.send(user._id);
      return;
    }
  }
});

app.get("/starbucks", async function (req, res) {
  const result = await Starbucks.find(); 
  res.send(result);
  return;
});
 

//몽고 디비에 접속
// mongoose.connect("mongodb://localhost:27017/codecamp") //localhost -> my_database
mongoose.connect("mongodb://my_database:27017/codecamp");

// 익스프레스 서버 오픈
app.listen(3000);
