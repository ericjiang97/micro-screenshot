var { json, send } = require("micro");
var { router, post, get } = require("microrouter");
var Nightmare = require("nightmare");
var fs = require("fs");
var imgurUploader = require("imgur-uploader");

var nightmare = Nightmare();    

const takeScreenshot = (req, res) =>{
    var targetSite = req.headers.site
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
}

const notfound = (req, res) =>
  send(res, 404, 'Not found route')

module.exports = router(
  get('/take/', takeScreenshot)
)