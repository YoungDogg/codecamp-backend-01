// const express = require('express') // 옛날 import 방식
import express from "express";
import { checkValidationPhone, getToken, sendToken2SMS } from './phone.js';
import {getWelcomeTemplate,  sendTempToEmail} from './email.js'
import swaggerUi from'swagger-ui-express';
import swaggerJsdoc from'swagger-jsdoc';
import {options} from './swagger/config.js';
// const swaggerSpec = swaggerJSDoc(options);
import dotenv from 'dotenv'
dotenv.config()


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
  const myToken = getToken(6);
  // 3. 휴대폰 번호에 토큰 전송
  sendToken2SMS(req.body.myphone, myToken)
  res.send('인증완료!!');
});

app.post("/users", function(req, res){
    const user = req.body.user;
    let [name, age, school] = "";
    name = user.name;
    age = user.age;
    school = user.school;
    email = user.email;
    // console.log("user : " + user);
      // 1. email이 정상인지 확인(eamil 존재 여부, @포함여부)
      if(user.email === undefined || !user.email.split("").includes("@")){
        console.log(user.email);
        console.log("이메일 다시 쓰세요");
    }else{
        // 2. 가입환영 템플릿 만들기
         ;
        // 3. 이메일에 가입환영 템플릿 전송하기
        console.log(user.name + "님,  반갑습니다.");
        sendTempToEmail(user.email, getWelcomeTemplate({name, age, school}));
    }
});

app.listen(3000);
