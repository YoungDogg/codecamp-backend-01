const apple = 3;
const banana = 2;

console.log("철수는 사과를 " + apple + "개" + ", 바나나를 " + banana + "개 가지고 있습니다.");
console.log(`철수는 사과를 ${apple}개, 바나나를 ${banana}개 가지고 있습니다.`);

function getWelcomeTemplate(){
    const name ="철수";
    const age =  8 
    const school = "람쥐초등학교" 
    const createdAt = "2020-02-02" 
    return `
        <html>
            <body>
                <h1>${name}님 반갑습니다.</h1>
                <hr/>
                <div>이름 : ${name}<div/>
                <div>나이 : ${age}살<div/>
                <div>학교 : ${school}<div/>
                <div>가입일 : ${createdAt}<div/>
            </body>
        </html>
        `;
}