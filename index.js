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
    console.log(targetSite, height, width)
    if(targetSite){
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