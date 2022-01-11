// 1. 날짜/시간을 생성하는 함수를 하나 만들고, 해당 함수를 실행하면 “오늘은 2020년 12월 2일 11:30:29 입니다.” 라는 메시지가 콘솔에 출력되도록 만들어 주세요.
//     - 콘솔에 출력된 화면의 캡쳐본과 코드가 적힌 파일을 클래스룸에 제출해주세요.

const makeDate = () => {
    let today = new Date();
    console.log(`오늘은 ${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 ${today.getHours().toString().padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')}:${today.getSeconds().toString().padStart(2, '0')} 입니다.`);
}
makeDate();