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
        .then(res => {
            imgurUploader(res)
                .then( res => {
                        console.log(res.link)
                        send(res, 200, `${res.link}`) 
                        return res;
                    })
        })
        .catch(err => {
            console.error(err)
        })
}

const notfound = (req, res) =>
  send(res, 404, 'Not found route')

module.exports = router(
  get('/take/', takeScreenshot)
)