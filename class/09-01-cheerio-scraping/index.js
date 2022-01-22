import axios from "axios";
import cheerio from "cheerio";

async function getOpenGraph(mydata) {
  const myaddress = mydata.contents.split(" ").filter((el)=> (el.includes("http")))

  const htmlNaver = await axios.get(myaddress[0]);
  const $ = cheerio.load(htmlNaver.data);
  $("meta").each((_, el) => {
    const key = $(el).attr("property")?.split(":")[1];
    if (key) {
      const value = $(el).attr("content");
      console.log("================key, value=============");
      console.log(key, value);
    }
  });
  // cheerio.load(htmlNaver);
  // console.log(htmlNaver)
}

const mydata = {
  title: "안녕하세요~",
  contents: "내용 1 https://www.naver.com",
};

getOpenGraph(mydata);
