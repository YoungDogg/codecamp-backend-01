import puppeteer from "puppeteer";
import mongoose from "mongoose";
import { Stock } from "./models/stock.model.js";
mongoose.connect("mongodb://localhost:27017/codecamp");

async function startCrawling() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  (await page).setViewport({ width: 1280, height: 720 });
  (await page).goto("https://finance.naver.com/item/sise.naver?code=005930");
  (await page).waitForTimeout(1000);
  const myIframePage = page.frames((iframe) =>
    iframe
      .url()
      .includes("#content > div.section.inner_sub > iframe:nth-child(3)")
  );

  // const stage = await page.$eval('#poduct_list_area > li:nth-child(2) > a > div > div.name > div > span',  el => el.textContent)
  // const location = await page.$eval('#poduct_list_area > li:nth-child(2) > a > div > div.name > p:nth-child(4)', el => el.textContent)
  // const price = await page.$eval("#poduct_list_area > li:nth-child(2) > a > div > div.price > p > b", el => el.textContent) // 홈페이지 개발자 모드에서 셀렉터 복사

  for (let i = 3; i <= 7; i++) {
    await page.waitForTimeout(3000);
    // await page.$eval("#poduct_list_area > li:nth-child(2) > a > div > div.price > p > b", el => el.textContent) // 긁어온 것
    const mydate = myIframePage.$eval(
      `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(1) > span`,
      (el) => el.textContext
    );
    const price = await myIframePage.$eval(
      `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(2) > span`,
      (el) => el.textContent
    );
    const stock =  new Stock({
      name: "삼성전자",
      date: mydate,
      price: Number(price.replace(",", "")),
    });
    await stock.save();
    console.log("날짜 : " + mydate, "가격 : " + price);
    console.log(price);
  }

  await browser.close();
  // console.log(stage)
  // console.log(location)
}

startCrawling();
