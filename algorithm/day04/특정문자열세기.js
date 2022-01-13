// 내코드
function countLetter(str) {
  let count = 0;
  let pos = 0;
  while (true) {
    let aPosition = str.indexOf("a", pos);
    if (aPosition === -1) break;
    pos = aPosition + 1;
    count++;
  }
  pos = 0;
  while (true) {
    let bigAPosition = str.indexOf("A", pos);
    if (bigAPosition === -1) break;
    pos = bigAPosition + 1;
    console.log(bigAPosition);
    count++;
  }
  console.log("result : " + count);
} // 소문자로 바꾸면 됐었다.

//개정
function countLetter(str) {
  str = str.toLowerCase().split("");

  let count = 0;
  let pos = 0;
  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] === "a") count++;
  }

  console.log("result : " + count);
}
