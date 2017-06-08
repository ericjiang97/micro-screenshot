var { json, send } = require("micro");
var { router, post, get } = require("microrouter");
var Nightmare = require("nightmare");
var fs = require("fs");
var imgurUploader = require("imgur-uploader");

var nightmare = Nightmare();    

const takeScreenshot = (req, res) =>{
    var targetSite = req.headers.site
    if(targetSite){
        nightmare
            .goto(targetSite)
            .wait(3000)
            .viewport(1920, 1060)
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
    } else {
        send(res, 400, {"error": "URL not defined"})
    }
}

const customTake = (req, res) =>{
    var targetSite = req.headers.site;
    var height = req.headers.height;
    var width = req.headers.width;
    if(targetSite){
        if(height && width){
            nightmare
                .goto(targetSite)
                .wait(3000)
                .viewport(width, height)
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
        } else {
            send(res, 400, {"error": "Height and/or Width not defined"})
        }
    } else {
        send(res, 400, {"error": "URL not defined"})
    }
}

const notfound = (req, res) =>
  send(res, 404, 'Not found route')

module.exports = router(
  get('/take', takeScreenshot),
  get('/takeCustom', customTake)
)