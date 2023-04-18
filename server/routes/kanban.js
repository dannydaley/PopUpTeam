var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    res.send(`You're trying to access our back-end.`);
});

module.exports = router;
