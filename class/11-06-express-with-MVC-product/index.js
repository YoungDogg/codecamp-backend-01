import express from "express";
import { ProductController } from "./mvc/controllers/product_controller.js";


const app = express();


// 상품 API
const productController = new ProductController(); // 인스턴스라고 한다
app.post("/product/buy", productController.buyProdect); //  productController.buyProdect()   <---- 괄호 빼자        함수에 소괄호를 빼고 넣을 때 어떤 때가 있지? 
app.post("/product/refund", productController.refundProduct);// 상품 환불하기

// 쿠폰 API 


app.listen(3000);
