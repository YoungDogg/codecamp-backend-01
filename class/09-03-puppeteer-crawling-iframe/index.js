import puppeteer from "puppeteer";

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

  // const stage = await page.$eval("#poduct_list_area > li:nth-child(3) > a > div > div.price.no-event > p:nth-child(3) > b", el => el.textContent)
  // const location = await page.$eval("#poduct_list_area > li:nth-child(3) > a > div > div.name.no-event > p:nth-child(3)", el => el.textContent)
  // const price = await page.$eval("#poduct_list_area > li:nth-child(2) > a > div > div.price > p > b", el => el.textContent)

// for(){
    
    await page.waitForTimeout(3000)
    const price = await myIframePage.$eval(
        "body > table.type2 > tbody > tr:nth-child(3) > td:nth-child(2) > span",
        (el) => el.textContent
        );
        console.log(price);
    // }

  await browser.close();
  // console.log(stage)
  // console.log(location)
}

startCrawling();
