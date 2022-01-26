import express from "express";
import { CouponController } from "./mvc/controllers/coupon.controller.js";
import { ProductController } from "./mvc/controllers/product_controller.js"; 
import { CashService } from "./mvc/controllers/services/cash.js";
import { PointService } from "./mvc/controllers/services/point.js";
import { ProductService } from "./mvc/controllers/services/product.js";
const app = express();

// 이게 싱글톤이라고 하는데 global 또는 window 변수를 통해서도 만들 수 있지 않을까?
const productService = new ProductService();
const moneyService = new PointService();
const moneyService2 = new CashService();

// 상품 API
const productController = new ProductController(moneyService, productService); // 인스턴스라고 한다
app.post("/product/buy", productController.buyProduct); //  productController.buyProdect()   <---- 괄호 빼자        함수에 소괄호를 빼고 넣을 때 어떤 때가 있지? 
app.post("/product/refund", productController.refundProduct);// 상품 환불하기

// 쿠폰 API 
const couponController = new CouponController(moneyService2, productService);
app.post("/coupons/buy", couponController.buyCounpon);

app.listen(3000);
