import { CashService } from "./services/cash.js"

export class CouponController {

    buyCounpon = (req, res) =>{
        // 1. 가진돈 검증하는 코드
        const moneyService = new CashService();
        const hasMoney =  moneyService.checkValue();
        
    
        // 2. 돈이 있으면 구매한다.
        if(hasMoney){
            console.log("쿠폰을 산다");
        }

        res.send("쿠폰을 산다")
    }
}