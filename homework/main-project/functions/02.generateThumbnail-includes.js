const { Storage } = require("@google-cloud/storage");
const sharp = require("sharp");

exports.generateThumbnail = async (event, context) => {
  // 1. event, context 데이터로그 확인하기
  console.log("hello world!!!");
  console.log("====================");
  console.log("context: ", context);
  console.log("evnt: ", event);
  console.log("====================");

  // 2. 이미 썸네일이 있는 경우
  if (event.name.includes("thumb/")) return;

  // 3. 생성된 썸네일을 재업로드
  const storage = new Storage().bucket(event.bucket);
  await new Promise((resolve, reject) => {
    storage
      .file(event.name)
      .createReadStream() // 3. 기존 파일을 읽어오기
      .pipe(sharp().resize({ width: 320, height: 240 })) // 4. event 안의 file을 활용하여 썸네일 생성
      .pipe(storage.file(`thumb/${event.name}`).createWriteStream()) // 5. 생성된 썸네일을 재업로드
      .on("finish", () => resolve())
      .on("error", () => reject());
  });
};
