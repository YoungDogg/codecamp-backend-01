// const express = require('express') // 옛날 import 방식
import express from "express";
import { checkValidationPhone, getToken, sendToken2SMS } from "./phone.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
// const swaggerSpec = swaggerJSDoc(options);

const app = express();
app.use(express.json()); // json으로 받은걸 보여준다

// const express = require('express');
// const app = express();

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.get("/lookupMember", function (req, res) {
  // res.send('Hello World')
  res.send([
    {
      email: "aaa@gmail.com",
      name: "철수1",
      phone: "01012345678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "aaa@gmail.com",
      name: "철수2",
      phone: "01012345678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "aaa@gmail.com",
      name: "철수3",
      phone: "01012345678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "aaa@gmail.com",
      name: "철수4",
      phone: "01012345678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "aaa@gmail.com",
      name: "철수5",
      phone: "01012345678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
  ]);
});

app.post("/lookupMember", function (req, res) {
  console.log(req.body);

  res.send("등록 성공");
});

app.get("/lookupCoffeList/5", function (req, res) {
  res.send([{ name: "아메리카노", kcal: 5 },
  { name: "아메리카노2", kcal: 5 },
  { name: "아메리카노3", kcal: 5 },
  { name: "아메리카노4", kcal: 5 },
  { name: "아메리카노5", kcal: 5 },
  { name: "아메리카노6", kcal: 5 },
  { name: "아메리카노7", kcal: 5 },
  { name: "아메리카노8", kcal: 5 },
  { name: "아메리카노9", kcal: 5 },
  { name: "아메리카노10", kcal: 5 },]);
});

app.get("/tokens/phone", function (req, res) {
  res.send([
    {
      email: "aaa@gmail.com",
      name: "철수6",
      phone: "01012345678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
  ]);
});

app.post("/tokens/phone", function (req, res) {
  console.log(req.body);
  // 1. 휴대폰 번호 자리수 확인
  checkValidationPhone(req.body.myphone);
  // 2. 토큰 6자리 만들기
  const myToken = getToken(6);
  // 3. 휴대폰 번호에 토큰 전송
  res.send(sendToken2SMS(req.body.myphone, myToken));
});

app.listen(3000);
