function getToken(num){
    if(num === undefined){
        console.log("error occured num === undefined, type the right number");
        return;
    } else if(num <= 0){
        console.log("error occured num <= 0 , type the right number");
        return;
    } else if(num > 10){
        console.log("error occured num > 10, type the right number");
        return;
    }

    const result = String(Math.floor(Math.random() * Math.pow(10, num))).padStart(num,"0");
    console.log(result);
}

function getToken(){    // 오버로딩 된 값으로 들어온다. getToken(num)에 undefined 예외처리를 해도
    console.log("hihihihh");
}
getToken(8);