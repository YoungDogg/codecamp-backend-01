import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { options } from "./swagger/config.js";

import { TokenController } from "./controllers/token_controller.js";
import { UsersController } from "./controllers/users_controller.js";
import { StarbucksController } from "./controllers/starbucks_controller.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
dotenv.config();

const tokenController = new TokenController();
app.get("/tokens/phone", tokenController.getToken);
app.post("/tokens/phone", tokenController.postToken);
app.patch("/tokens/phone", tokenController.patchToken); 

const usersController = new UsersController();
app.get("/users", usersController.getUsers);
app.post("/users", usersController.postUsers); 

const starbucksController = new StarbucksController();
app.get("/starbucks", starbucksController.getStarbucks); // 여기에서 쓰인다

mongoose.connect("mongodb://my_database:27017/codecamp");

app.listen(3000);
