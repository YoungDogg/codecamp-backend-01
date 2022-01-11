const apple = 3;
const banana = 2;

console.log("철수는 사과를 " + apple + "개" + ", 바나나를 " + banana + "개 가지고 있습니다.");
console.log(`철수는 사과를 ${apple}개, 바나나를 ${banana}개 가지고 있습니다.`);

function getWelcomeTemplate(name,age,school){
    const createdAt = "2020-02-02";  // back-end

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
const myname ="철수";
const myage =  8; 
const myschool = "람쥐초등학교";
getWelcomeTemplate(myname,myage,myschool);