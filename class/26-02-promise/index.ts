// 1. 기본
// await new Promise((resolve, reject) => {
//   if (성공) {
//     resolve();
//   } else {
//     reject();
//   }
// });

// 2.
async function fetchData() {
  const result = await new Promise((resolve, reject) => {
    setTimeout(() => {
      // 외부에 데이터 보내고 받는데 2초 걸리는 어떤 작업
      try {
        resolve("성공시 받는 데이터");
      } catch (error) {
        reject("실패했습니다!");
      }
    }, 2000);
  });

  console.log(result);
  console.log("끝");
}



fetchData();
