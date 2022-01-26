import axios from "axios";
import cheerio from "cheerio";

export  const getOpenGraph = async (mydata) => {
  const htmlSite = await axios.get(mydata);
  
  const $ = cheerio.load(htmlSite.data);
  let result = {};
  let title = "";
  let description = "";
  let image = "";
  $("meta").each((_, el) => {
    let key = "";
    if ($(el).attr("property")?.split(":")[0] === "og") {
      key = $(el).attr("property")?.split(":")[1];
    }

    if (key === "title") {
      const value = $(el).attr("content");
      // console.log(key, value);
      title = value;
    } else if (key === "description") {
      const value = $(el).attr("content");
      // console.log(key, value);
      description = value;
    } else if (key === "image") {
      const value = $(el).attr("content");
      // console.log(key, value);
      image = value;
    }
  });
  result.title = title;
  result.description = description;
  result.image = image;
  
  // console.log("======getOG.js==========="); 
  // console.log(result);
  return result;
}

// const mydata = {
//   title: "안녕하세요~",
//   contents: "내용 1 https://www.naver.com",
// };

// getOpenGraph(mydata);
