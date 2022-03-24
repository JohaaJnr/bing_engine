const express = require('express')
const puppeteer = require('puppeteer')
const Route = express.Router()

Route.get('/', (req,res)=>{
    res.render('index')
})

Route.post('/search', (req,res)=>{


  (async () => {
    const query = req.body.searchtxt
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto(`https://www.bing.com/search?q=${query}`, { waitUntil: 'networkidle0' });
    
    const headings = await page.evaluate(()=>{
      return Array.from(document.querySelectorAll('h2')).map(e=>e.textContent)
    })
   
    const links = await page.evaluate(()=>{
       return Array.from(document.querySelectorAll('cite')).map(e=>e.innerText)
    })

    const body = await page.evaluate(()=>{
      return Array.from(document.querySelectorAll('p')).map(e=>e.innerText)
    })

    const response = []
    for(i=0; i<headings.length; i++){
     
      response.push({
        heading: headings[i],
        link: links[i],
        post: body[i]
      })
    
    }

   res.render('search', {data: response})
    
    await browser.close()
  })();
 
})



module.exports = Route