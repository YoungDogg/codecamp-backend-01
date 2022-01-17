// const express = require('express') // 옛날 import 방식
import express from "express";
import {
  checkValidationPhone,
  getToken,
  sendToken2SMS,
} from "../backend/phone.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
// const swaggerSpec = swaggerJSDoc(options);
import cors from "cors";

const app = express();
app.use(express.json()); // json으로 받은걸 보여준다
app.use(cors()); // 모든 주소 다 허용 // app.use(cors({origin})); 특정사이트
// const express = require('express');
// const app = express();

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.get("/boards", function (req, res) {
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
      writer: "Sam3 edited after nodemon",
      title: "basketball and me3",
      contents: "hey all3",
    },
  ]);
});

app.post("/boards", function (req, res) {
  console.log(req.body);

  res.send("등록 성공");
});

app.get("/tokens/phone", function (req, res) {
  res.send([
    {
      myphone: "01022223333",
    },
  ]);
  // console.log(res.send());
});

app.post("/tokens/phone", function (req, res) {
  // 1. 휴대폰 번호 자리수 확인
  checkValidationPhone(req.body.myphone);
  // 2. 토큰 6자리 만들기
  const myToken = getToken(6);
  // 3. 휴대폰 번호에 토큰 전송
  sendToken2SMS(req.body.myphone, myToken);
  res.send("인증완료 222222");
});

app.get("/lookupCoffeList/10", function (req, res) {
  res.send([
    { name: "아메리카노", kcal: 50 },
    {
      name: "아메리카노2",
      kcal: 50,
    },
    {
      name: "아메리카노3",
      kcal: 50,
    },
    {
      name: "아메리카노4",
      kcal: 50,
    },
    {
      name: "아메리카노5",
      kcal: 50,
    },
    {
      name: "아메리카노6",
      kcal: 50,
    },
    {
      name: "아메리카노7",
      kcal: 50,
    },
    {
      name: "아메리카노8",
      kcal: 50,
    },
    {
      name: "아메리카노9",
      kcal: 50,
    },
    {
      name: "아메리카노10",
      kcal: 50,
    },
  ]);
});
app.post("/lookupCoffeList/5", function (req, res) {
  console.log(req);
});

app.get("/users", function (req, res) {
  res.send([
    { name: "준식1", email: "a1@a.com", personal: "120111-1******", phone: "110-2234-5678", prefer: "1naver.com"},
    { name: "준식2", email: "a2@a.com", personal: "220111-1******", phone: "210-2234-5678", prefer: "2naver.com"},
    { name: "준식3", email: "a3@a.com", personal: "3220111-1******", phone: "310-2234-5678", prefer: "3naver.com"},
    { name: "준식4", email: "a4@a.com", personal: "4220111-1******", phone: "410-2234-5678", prefer: "4naver.com"},
    { name: "준식5", email: "a5@a.com", personal: "5220111-1******", phone: "510-2234-5678", prefer: "5naver.com"}
  ]);
});

app.listen(3000);
