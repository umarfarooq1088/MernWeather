var express = require("express");
const request = require("request");
var router = express.Router();

router.post('/abc', (req, res, next) => {
    city = req.body.pass;
    res.send(city);
    console.log(city);

    router.get("/", function(req, res, next) {

        var request = require("request");
        request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7b77242d6509244bcd3ea03b14e6dfad`,
            function(error, response, body) {
                let data = JSON.parse(body);

                res.send(data);
            })
    });
});



router.get("/country", function(req, res, next) {

    var request = require("request");
    request(`https://v6.exchangerate-api.com/v6/ac9e5d6395654a8528b24243/latest/USD`,
        function(error, response, body) {
            let data = JSON.parse(body);

            res.send(data);
        })
});
router.get("/name", function(req, res, next) {

    var request = require("request");
    request(`https://pkgstore.datahub.io/core/currency-codes/codes-all_json/data/029be9faf6547aba93d64384f7444774/codes-all_json.json`,
        function(error, response, body) {
            let data = JSON.parse(body);

            res.send(data);
        })
});
module.exports = router;