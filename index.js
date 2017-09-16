var { json, send } = require("micro");
var { router, post, get } = require("microrouter");
var Nightmare = require("nightmare");
var fs = require("fs");
var imgurUploader = require("imgur-uploader");

var nightmare = Nightmare();    

const takeScreenshot = async (req, res) =>{
    const body = await json(req)
    var targetSite = body.url
    var height = body.height || null
    var width = body.width || null
    var duration = body.duration || 2000
    var fullPage = body.fullPage || false
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
                    var body = document.querySelector('body');
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

const notfound = (req, res) =>
  send(res, 404, 'Not found route')

module.exports = router(
  post('/take', takeScreenshot)
)