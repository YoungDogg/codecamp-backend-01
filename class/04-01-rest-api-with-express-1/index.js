// const express = require('express') // 옛날 import 방식
import express from 'express'
const app = express()
 

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/profile', function (req, res) {
  res.send('Sam 26 y/o')
})

app.listen(3000)