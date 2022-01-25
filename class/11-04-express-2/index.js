import express  from "express";

const app = express();

// 상품 구매하기
app.post('/product/buy', (req, res) => {
    // 1. 가진돈 검증하는 코드 (10줄)
    // 10 줄 있다고 치자

    // 2. 판매여부 검증하는 코드(10줄)
    // 10 줄 있다고 치자

    // 3. 상품 구매하는 코드
    // if(돈있음 && 판매 중){
        res.send("상품을 구매합니다"); 
    // }
});


// 상품 환불하기
app.post('/product/refund', (req, res) => {
    // 1. 판매여부 검증 코드 (10줄)
    // 10 줄 있다고 치자

    // 2. 상품 환불하는 코드
    // if(!판매 중){
        res.send("상품을 환불합니다"); 
    //}

})


app.listen(3000);