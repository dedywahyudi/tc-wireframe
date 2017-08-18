var fs = require("fs");
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var subsFolder = __dirname + '/../public/subs';

    fs.exists(subsFolder, function(blnExists) {
        if (blnExists) {
            fs.readdir(subsFolder, function(err, list) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    var sublist = [];

                    for (var i = 0; i < list.length; ++i) {
                        sublist[i] = {
                            path: '/subs/' + list[i],
                            name: list[i]
                        };
                    }

                    res.render('index', {
                        title: 'The Submissions',
                        sublist: sublist
                    });
                }
            });
        } else {
            res.render('index', {
                title: 'dein Prototypen!',
                sublist: []
            });
        }
    });
});

module.exports = router;
