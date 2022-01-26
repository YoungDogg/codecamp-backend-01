// const express = require('express') // 옛날 import 방식
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import mongoose from "mongoose";
import cors from "cors";
import { UserController } from "./controllers/user_controller.js";
 
const app = express();
app.use(express.json()); // json으로 받은걸 보여준다
app.use(cors()); // 모든 주소 다 허용 // app.use(cors({origin})); 특정사이트
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));


const userController = new UserController();
app.get("/users", userController.getUser);
app.post("/users", userController.postUser);

//몽고 디비에 접속
// mongoose.connect("mongodb://localhost:27017/codecamp") //localhost -> my_database
mongoose.connect("mongodb://my_database:27017/codecamp");

// 익스프레스 서버 오픈
app.listen(3000);
