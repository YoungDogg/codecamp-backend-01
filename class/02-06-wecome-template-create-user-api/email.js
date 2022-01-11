// utils.js 받기
import { getCreatedAt } from "./utils.js";
export function getWelcomeTemplate({name, age, school}){
    const createdAt = getCreatedAt();  // back-end

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