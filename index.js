const puppeteer = require('puppeteer');
const pages = ['home', 'KQStation', 'HLDMStation', 'guding', 'shengtai', 'soil', 'gufei', 'fushe', 'zhifa', 'jianguan']

const delay = () => (
  new Promise(resolve => {
    setTimeout(resolve, 3000)
  })
)

const getPic = async (pageName) => {
  const pageUrl = pageName === 'home' ? pageName : 'main/' + pageName
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1920,
      height: 1080
    }
  })
  const page = await browser.newPage()
  console.log(pageUrl)
  await page.goto(`http://10.61.5.46:8006/#/${pageUrl}`)
  if (pageName !== 'home') {
    await page.click ('.open')
    await delay()
  }
  await page.screenshot({ path: `./public/${pageName}.png` })
  await browser.close()
  console.log(pageName + ' is success!')
}

;(async () => {
  for (let page of pages) {
    await getPic(page)
  }
})()
