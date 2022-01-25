import { CashService } from "./services/cash.js";
import { ProductService } from "./services/product.js";

export class ProductController {
    buyProdect =  (req, res) => {
      // 1. 가진돈 검증하는 코드 (10줄)
      const cashService = new CashService();
      const hasMoney = cashService.checkValue();
    
      // 판매여부 검증하는 코드
      const productService = new ProductService();
      const isSoldOut = productService.checkSoldout();
    
      // 3. 상품 구매하는 코드
      // if(돈있음 && 판매 중){
      if (hasMoney && !isSoldOut) {
        res.send("상품을 구매합니다");
      }
    }
  
    refundProduct = (req, res) => {
      // 1. 판매여부 검증 코드 (10줄)
      const cashService = new CashService();
      const hasMoney = cashService.checkValue();
    
      const productService = new ProductService();
      productService.checkSoldout();
    
      // 2. 상품 환불하는 코드
      // if(!판매 중){
      if (!isSoldOut) res.send("상품을 환불합니다");
      //}
    }
  }
  