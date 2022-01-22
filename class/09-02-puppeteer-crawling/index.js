import puppeteer from 'puppeteer'

async function startCrawling(){

    const browser = await puppeteer.launch({ headless: false }) //headless: true 로 브라우저 끌수도있음(작동은 하지만 눈에 안보이는상태)
    const page = await browser.newPage()
    await page.setViewport({ width:1280, height: 720 }) // 페이지 크기
    await page.goto("https://www.goodchoice.kr/product/search/2") // 브라우저 페이지로 이동
    page.waitForTimeout(1000) //페이지 로딩까지 1초 기다림

    const stage = await page.$eval('#poduct_list_area > li:nth-child(2) > a > div > div.name > div > span',  el => el.textContent)
    const location = await page.$eval('#poduct_list_area > li:nth-child(2) > a > div > div.name > p:nth-child(4)', el => el.textContent)
    const price = await page.$eval("#poduct_list_area > li:nth-child(2) > a > div > div.price > p > b", el => el.textContent) // 홈페이지 개발자 모드에서 셀렉터 복사

    //#poduct_list_area > li:nth-child(3) > a > div > div.price > p > b  
    //2번재 가격 가지고왔는데 li:nth-child(3) 인걸 보아 li:nth-child(3) 기준으로 반복문 돌리면 여러개 가지고와질것!

    console.log(stage)
    console.log(location.trim())
    console.log(price)

    await browser.close()  // 브라우저 종료

}

// 1개 가지고옴 / 만약 여러개 가지고오고 싶다면 반복문 돌리면되는것!

// 브라우저 실행
startCrawling() //chromium 브라우저로 실행됨(창크기는 우리가 정한 사이즈로)