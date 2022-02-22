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
  console.time("개별 프로미스");

  const result1 = await new Promise((resolve, reject) => {
    setTimeout(() => {
      // 외부에 데이터 보내고 받는데 2초 걸리는 어떤 작업
      resolve("성공시 받는 데이터");
    }, 2000);
  });

  const result2 = await new Promise((resolve, reject) => {
    setTimeout(() => {
      // 외부에 데이터 보내고 받는데 2초 걸리는 어떤 작업
      resolve("성공시 받는 데이터");
    }, 3000);
  });

  const result3 = await new Promise((resolve, reject) => {
    setTimeout(() => {
      // 외부에 데이터 보내고 받는데 2초 걸리는 어떤 작업
      resolve("성공시 받는 데이터");
    }, 1000);
  });

  console.timeEnd("개별 프로미스");
  console.log("끝");
}

async function fetchData2() {
  console.time("개별 프로미스 올");
  await Promise.all([
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공받는 데이터");
      }, 2000);
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공받는 데이터");
      }, 3000);
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공받는 데이터");
      }, 1000);
    }),
  ]);
  console.timeEnd("개별 프로미스 올");
}

fetchData();
fetchData2();
