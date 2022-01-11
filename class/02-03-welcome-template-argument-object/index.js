const apple = 3;
const banana = 2;

console.log("철수는 사과를 " + apple + "개" + ", 바나나를 " + banana + "개 가지고 있습니다.");
console.log(`철수는 사과를 ${apple}개, 바나나를 ${banana}개 가지고 있습니다.`);

function getWelcomeTemplate(user){
    const createdAt = "2020-02-02";  // back-end

    return `
        <html>
            <body>
                <h1>${user.myname}님 반갑습니다.</h1>
                <hr/>
                <div>이름 : ${user.myname}<div/>
                <div>나이 : ${user.myage}살<div/>
                <div>학교 : ${user.myschool}<div/>
                <div>가입일 : ${createdAt}<div/>
            </body>
        </html>
        `;
}
const myuser = {
    myname :"철수",
    myage : 8,
    myschool : "람쥐초등학교"
}
 
getWelcomeTemplate(myuser);