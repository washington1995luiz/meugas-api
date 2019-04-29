const express = require('express');
const jwt = require('jsonwebtoken');
const authConfig = require('../../../config/auth');

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        // expiresIn: 86400,
    });
}

router.post('/auth/authenticate', async (req, res) => {

    try {
    res.send(generateToken());
    } catch(error) {
        return res.status(400).send({error});
    }

});

module.exports = app => app.use('/user', router);