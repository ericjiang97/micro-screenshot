const { json, send } = require("micro");
const { router, post, get } = require("microrouter");
const Nightmare = require("nightmare");

const Puppeteer = require('puppeteer')

const fs = require("fs");
const imgurUploader = require("imgur-uploader");

const nightmare = Nightmare();    


const takeScreenshot = async (req, res) =>{
    const body = await json(req)
    const targetSite = body.url
    const height = body.height || null
    const width = body.width || null
    const duration = body.duration || 2000
    const fullPage = body.fullPage || false
    if(targetSite){
        if(height && width && fullPage){
            send(err, 400, {"error": "Bad Request"})
        }

        if(height && width){
            nightmare
                .goto(targetSite)
                .wait(duration)
                .viewport(width, height)
                .screenshot()
                .then(screen => imgurUploader(screen))
                .catch(err => {
                    console.error(err)
                    send(err, 500, {"error": err})
                })
                .then(screen => {
                    send(res, 200, {"url": screen.link}) 
                    return res;
                })
                .catch(err => {
                    console.error(err)
                    send(err, 500, {"error": err})
                })
        } else if(fullPage) {
            nightmare
                .goto(targetSite)
                .wait('body')       //wait till body is loaded
                .evaluate(() =>{
                    const body = document.querySelector('body');
                    return { 
                        height: body.scrollHeight,
                        width:body.scrollWidth
                    }
                })
                .then(result => {
                    console.log(result)
                    nightmare
                        .goto(targetSite)
                        .wait('body')       //wait till body is loaded
                        .viewport(result.scrollheight, result.scrollWidth)
                        .screenshot()
                        .then(screen => imgurUploader(screen))
                        .catch(err => {
                            console.error(err)
                            send(err, 500, {"error": err})
                        })
                        .then(screen => {
                            send(res, 200, {"url": screen.link}) 
                            return res;
                        })
                        .catch(err => {
                            console.error(err)
                            send(err, 500, {"error": err})
                        })
                })
                .catch(err => {
                    console.error(err)
                    send(err, 500, {"error": err})
                })

                
        } else {
            nightmare
                .goto(targetSite)
                .wait(duration)
                .viewport(1920, 1080)
                .screenshot()
                .then(screen => imgurUploader(screen))
                .then(screen => {
                    send(res, 200, {"url": screen.link}) 
                    return res;
                })
                .catch(err => {
                    console.error(err)
                    send(err, 500, {"error": err})
                })
        }
    } else {
        send(res, 400, {"error": "URL not defined"})
    }
}

const takeScreenshotV2 = async (req, res) =>{
    const body = await json(req)
    const targetSite = body.url
    const height = body.height || null
    const width = body.width || null
    const duration = body.duration || 2000
    const fullPage = body.fullPage || false

    const browser = await Puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(targetSite)
    await page.screenshot()
            .then(screen => {
                console.log(screen)
            })
        
}

const notfound = (req, res) =>
  send(res, 404, 'Not found route')

module.exports = router(
  post('/take', takeScreenshot),
  post('/v2/take', takeScreenshotV2)
)