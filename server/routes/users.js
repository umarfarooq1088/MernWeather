var express = require('express');
var router = express.Router();
const data = require('../model/userSchema');

router.get('/', (req, res) => {

    data.find().then(results => {
        res.status(200).json({
            results
        });
    })
})
module.exports = router;


// var database;
// const MongoClient = require('mongodb').MongoClient;

// MongoClient.connect('mongodb://localhost:27017', {
//     useNewUrlParser: true,
//     // useUnifiedTopology: true,
//     // useCreateIndex: true,
//     // useFindAndModify: false
// }, (error, result) => {
//     if (error) {
//         console.log("no connection from users");
//     } else {
//         database = result.db('mernstack');
//         console.log(" connection from users");
//     }
// })
// router.get('/', (req, res) => {
//   database.collection('users').find().toArray((err, result) => {
//     if (err) {
//         res.send(error);
//     } else {
//         // let data = JSON.parse(result);
//         console.log("data");
//         res.send(result);
//     }
// })
// })