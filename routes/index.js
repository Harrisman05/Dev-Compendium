const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    console.log("Get request sent from client to root directory");
    res.render('index', {text: "hello"})
});

module.exports = router;