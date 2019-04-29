const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../../../config/auth');

const Store = require('../../models/store/store');

const router = express.Router();

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register/store', async(req, res) => {
    const { email } =  req.body;
    
    try{

        if(await Store.findOne({email})){
            return res.status(400).send({ error: 'User already exists'});
        }

        const store = await Store.create(req.body);

        store.password = undefined;

        return res.send({store, token: generateToken({id: store.id})});
    } catch(err){
        return res.status(400).send({error: 'Registation failed'});
    }
});

router.post('/authenticate/store', async (req, res) => {
    const { email, password } = req.body;

    const storeUser = await Store.findOne({ email }).select('+password');

    if(!storeUser){
        return res.status(400).send({error: 'storeUser not found'});
    }
       
    
    if(!await bcrypt.compare(password, storeUser.password)){
        return res.status(400).send({error: 'Invalid password'});

    }
        
    storeUser.password = undefined;

    res.send({storeUser, token: generateToken({id: storeUser.id})});

});

module.exports = app => app.use('/auth', router);