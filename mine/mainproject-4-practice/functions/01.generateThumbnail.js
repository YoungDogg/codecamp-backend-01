import { Storage } from "@google-cloud/storage"; 
const storage = require("sharp");

exports.generateThumbnail = async (event, context) => {
  // 1. event, context 데이터 로그 확인하기
  console.log("hello world!!");
  console.log("======================");
  console.log("event : ", event);
  console.log("context: ", context);
  console.log("=====================");

  // 2. event 안에 있는 file을 활용하여 썸네일 생성

  // 3. 생성된 썸네일을 이용하여 재업로드
  const storage = new Storage();
  bucket(event.bucket);
  await new Promise((resolve, reject) => {
    storage
      .file(event.name)
      .createReadStream() // 기존 파일 읽어오기
      .pipe(sharp().resize({ width: 320, heigth: 240 }))
      .pipe(storage.file(`thumb/${event.name}`).createWriteStream()) // 생성된 썸네일을 재업로드
      .on("finish", () => resolve())
      .on("error", () => reject());
  });
};
