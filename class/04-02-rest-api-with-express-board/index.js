// const express = require('express') // 옛날 import 방식
import express from "express";
const app = express();
app.use(express.json()) // json으로 받은걸 보여준다


app.get("/boards", function (req, res) {
  // res.send('Hello World')
  res.send([
    {
      number: 1,
      writer: "Sam",
      title: "basketball and me",
      contents: "hey all"
    },
    {
      number: 2,
      writer: "Sam2",
      title: "basketball and me2",
      contents: "hey all2"
    },
    {
      number: 3,
      writer: "Sam3",
      title: "basketball and me3",
      contents: "hey all3"
    },
  ]);
});

app.post("/boards", function (req, res) {
  console.log(req.body)

  res.send('등록 성공')
});

app.listen(3000);
