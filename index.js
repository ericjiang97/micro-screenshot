var { json, send } = require("micro");
var { router, post, get } = require("microrouter");
var Nightmare = require("nightmare");
var fs = require("fs");
var imgurUploader = require("imgur-uploader");

var nightmare = Nightmare();    

const hello = (req, res) =>{
    var targetSite = req.headers.site
    var blob = ""
    nightmare.goto(targetSite).screenshot()
        .then(res => {
            blob = res
        })
        .catch(err => {
            console.error(err)
        })
    console.log(blob)
    if(blob){
        imgurUploader(blob)
                .then( res => {
                        console.log(res)
                        send(res, 200, `${res.link}`) 
                    })
    }
}

const notfound = (req, res) =>
  send(res, 404, 'Not found route')

module.exports = router(
  get('/take/', hello)
)