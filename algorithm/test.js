function solution() {

 
}

solution(123);


const hi = (n)=>{

  let decimalDigits = 10; // N의 범위 : 100,000,000 이하의 자연수니까 
  // n의 제일 큰 자리수를 가져온다
  // console.log(n % Math.pow(10, decimalDigits));
  console.log(n);
  console.log(n > (n % Math.pow(10, (decimalDigits-8))));
  for(; n > (n % Math.pow(10, decimalDigits)); decimalDigits--){
    console.log("hi"); 
  } 

  console.log(Math.pow(10, decimalDigits));
  // for(;Math.pow(10, decimalDigits) >= 0;
  //   decimalDigits--) {
  //   console.log('hi');
  // }

  document.getElementById("hithere").innerHTML = "hi";
}

