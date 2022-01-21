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
import { Board } from "./models/board.model.js";
import { Token } from "./models/token.model.js";

const app = express();
app.use(express.json()); // json으로 받은걸 보여준다

// const express = require('express');
// const app = express();

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.get("/boards", async function (req, res) {
  const result = await Board.find({ writer: "Sam" });
  console.log(result);
  // res.send('Hello World')

  res.send([
    {
      number: 1,
      writer: "Sam",
      title: "basketball and me",
      contents: "hey all",
    },
    {
      number: 2,
      writer: "Sam2",
      title: "basketball and me2",
      contents: "hey all2",
    },
    {
      number: 3,
      writer: "Sam3",
      title: "basketball and me3",
      contents: "hey all3",
    },
  ]);
});

app.post("/boards", async function (req, res) {
  console.log("boards 안녕하세요!");
  console.log(req.body);

  const board = new Board({
    writer: req.body.mywriter,
    title: req.body.mytitle,
    contents: req.body.mycontents,
  });
  await board.save(); // 몽고디비로 저장된다. 좀 기다려줘

  res.send("등록 성공");
});

app.get("/tokens/phone", function (req, res) {
  res.send([
    {
      myphone: "01011113333",
    },
  ]);
});

let globalToken = 0; // 인증토큰 업데이트 위해
app.post("/tokens/phone", async function (req, res) {
  console.log(req.body);
  // 1. 휴대폰 번호 자리수 확인
  checkValidationPhone(req.body.phone);
  const myToken = getToken(6);
  globalToken = Number(myToken);
  // 3. 휴대폰 번호에 토큰 전송
  sendToken2SMS(req.body.phone, myToken);
  res.send("인증완료!!" + req.body);

  const token = new Token({
    token: myToken,
    phone: req.body.phone,
    isAuth: req.body.isAuth,
  });
  await token.save(); // 몽고디비로 저장된다. 좀 기다려줘
   
});

app.patch("/tokens/phone", async function (req, res) {
  console.log(req.body);
  const phone = req.body.phone;
  const myToken = req.body.token;
  
  //토큰이 같다면
  // if (req.body.token === globalToken) {
    // ============isAuth 업데이트 안됨 updateOne====================================
    //  token.findOneAndUpdate({ token: globalToken }, { isAuth: true });
  // }
  //==================findByIdAndUpdate 안됨============================
  // if (req.body.token === globalToken) {
  //   await Token.findByIdAndUpdate(req.params.id, req.body, { isAuth: true });
  // }else{
  //   await Token.findByIdAndUpdate(req.params.id, req.body, { isAuth: false });
  // }

  res.send("patch 수정완료!!" + req.body);
});

app.post("/users", function (req, res) {
  const user = req.body.user;
  let [name, age, school] = "";
  name = user.name;
  age = user.age;
  school = user.school;
  email = user.email;
  // console.log("user : " + user);
  // 1. email이 정상인지 확인(eamil 존재 여부, @포함여부)
  if (user.email === undefined || !user.email.split("").includes("@")) {
    console.log(user.email);
    console.log("이메일 다시 쓰세요");
  } else {
    // 2. 가입환영 템플릿 만들기
    // 3. 이메일에 가입환영 템플릿 전송하기
    console.log(user.name + "님,  반갑습니다.");
    sendTempToEmail(user.email, getWelcomeTemplate({ name, age, school }));
  }
});

//몽고 디비에 접속
// mongoose.connect("mongodb://localhost:27017/codecamp") //localhost -> my_database
mongoose.connect("mongodb://my_database:27017/codecamp");

// 익스프레스 서버 오픈
app.listen(3000);
