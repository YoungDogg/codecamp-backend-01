import axios from "axios";
import cheerio from "cheerio";

export async function getOpenGraph(mydata) {
  const myaddress = mydata 
    .split(" ")
    .filter((el) => el.includes("http"));

  const htmlNaver = await axios.get(myaddress[0]);
  const $ = cheerio.load(htmlNaver.data);
  let result = {};
  $("meta").each((_, el) => {
    let key = "";
    if ($(el).attr("property")?.split(":")[0] === "og") {
      key = $(el).attr("property")?.split(":")[1];
    }

    if (key === "title") {
      const value = $(el).attr("content");
      // console.log(key, value);
      result.title += value;
    } else if (key === "url") {
      const value = $(el).attr("content");
      // console.log(key, value);
      result.url += value;
    } else if (key === "image") {
      const value = $(el).attr("content");
      // console.log(key, value);
      result.image += value;
    }
  });
  console.log("=================");
  console.log(result);
  return result;
}

// const mydata = {
//   title: "안녕하세요~",
//   contents: "내용 1 https://www.naver.com",
// };

// getOpenGraph(mydata);
