// const express = require('express') // 옛날 import 방식
import express from "express";
import { checkValidationPhone, getToken, sendToken2SMS } from './phone.js';
import swaggerUi from'swagger-ui-express';
import swaggerJsdoc from'swagger-jsdoc';
import {options} from './swagger/config.js';
// const swaggerSpec = swaggerJSDoc(options);

 
const app = express();
app.use(express.json()); // json으로 받은걸 보여준다

// const express = require('express');
// const app = express();

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));


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
      writer: "Sam3",
      title: "basketball and me3",
      contents: "hey all3",
    },
  ]);
});


app.post("/boards", function (req, res) {
  // console.log(req.body);
  console.log(req);

  res.send("등록 성공");
});

app.get("/tokens/phone", function (req, res) {
  res.send([
    {
      myphone: "01011113333",
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
  sendToken2SMS(req.body.myphone, myToken)
  res.send('인증완료!!');
});

app.listen(3000);
