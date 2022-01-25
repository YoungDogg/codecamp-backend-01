import puppeteer from "puppeteer";
import mongoose from "mongoose";
import { Starbucks } from "./models/stock.model.js";
mongoose.connect("mongodb://localhost:27017/codecamp");

async function startCrawling() {
  const browser = await puppeteer.launch({ headless: false }); //headless: true 로 브라우저 끌수도있음(작동은 하지만 눈에 안보이는상태)
  const page = await browser.newPage();
  // await page.setViewport({ width: 1280, height: 720 }); // 페이지 크기
  await page.goto("https://www.starbucks.co.kr/menu/drink_list.do"); // 브라우저 페이지로 이동
  page.waitForTimeout(1000); //페이지 로딩까지 1초 기다림

//   let imgArr = [
//     "https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002487]_20210426091745467.jpg",
//     "https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000479]_20210426091843897.jpg",
//     "https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002081]_20210415133656839.jpg",
//     "https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000487]_20210430112319040.jpg",
//     "https://image.istarbucks.co.kr/upload/store/skuimg/2021/03/[9200000003509]_20210322093452399.jpg",
//     "https://image.istarbucks.co.kr/upload/store/skuimg/2021/08/[9200000003661]_20210819094346176.jpg",
//     "https://image.istarbucks.co.kr/upload/store/skuimg/2020/09/[9200000002672]_20200921171223898.jpg",
//     "https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000038]_20210430113202458.jpg",
//     "https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000001636]_20210225093600536.jpg",
//     "https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000003285]_20210416154437069.jpg"
// ]

  for (let i = 1; i < 11; i++) {
    page.waitForTimeout(1000); //페이지 로딩까지 1초 기다림 
    const name = await page.$eval(
      `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(2) > ul > li:nth-child(${i}) > dl > dd`,
      (el) => el.textContent
    );
    //getAttribute를 쓰면 src부분만 추출 가능하다.
    const img = await page.$eval(
      `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(2) > ul > li:nth-child(${i}) > dl > dt > a > img`,
      (el) => el.getAttribute('src')
    ); 
    

    const starbucks =  new Starbucks({
      name: name,
      // img: imgArr[i-1]
      img: img
    });
    await starbucks.save();
  }


  await browser.close(); // 브라우저 종료
  // console.log(stage)
  // console.log(location)
}

startCrawling();
