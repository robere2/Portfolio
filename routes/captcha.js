const express = require('express');
const request = require('request');

const router = express.Router();
const recaptchaSecrets = require("../private/recaptcha_secret");

/* GET captcha page. */
router.get('/captcha', function(req, res, next) {
    let resJson = {
        ok: true
    };

    let token = req.query.token;
    let userIP = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);

    request.post("https://www.google.com/recaptcha/api/siteverify", {
        postData: {
            'content-type' : 'application/x-www-form-urlencoded',
            secret: recaptchaSecrets.secret,
            response: token,
            remoteip: userIP
        }
    }, function(err, reqRes, body) {
        if(err) {
            resJson.ok = false;
            resJson.error = err;
        } else if(body) {
            let captchaRes = JSON.parse(body);

            if(captchaRes.ok) {
                resJson.ok = true;
                resJson.email = recaptchaSecrets.email
            } else {
                resJson.ok = false;
                resJson.error = captchaRes["error-codes"];
            }
        }

        res.json(resJson);
        next();
    });
});

module.exports = router;
