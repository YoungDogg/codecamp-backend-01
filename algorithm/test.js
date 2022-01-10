// 1층에 있는 로봇이 100층까지 가기위한 횟수 구하기

let robot = 1; // 로봇의 현재 위치
const stair = 100; // 계단의 개수
let count = 0;  //오른 횟수


if(stair > robot){ // 만약 로봇이 2칸씩 오를 계단이 남아있다면 
  count += stair / 2;  // 2칸씩 올라간 횟수를 더한다.
}else{ // 계단이 한 칸만 남은 상태라면
  count += 1;
}
count = Math.round(count);

console.log("git 테스트용");