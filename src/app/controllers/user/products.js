const express = require('express');
const authMiddlewares = require('../../middlewares/auth');

const Products = require('../../models/store/products');
const City = require('../../models/store/city');
const router = express.Router();

router.use(authMiddlewares);

router.get('/list/all', async (req, res) => {

    try {
        const products = await Products.find();

        return res.status(200).send(products);
    }
    catch (err) {
        return res.status(400).send({ error: 'Error list' });
    }
});

router.get('/list/all/city', async (req, res) => {
    try {

        const listCity = await City.find();

        return res.status(200).send(listCity);

    } catch (err) {
        return res.status(400).send({ err });
    }
})

router.get('/list/:id', async (req, res) => {

    try {
        const products = await Products.findOne({ store: req.params.id });

        return res.status(200).send(products);
    }
    catch (err) {
        return res.status(400).send({ error: 'Error list' });
    }
});

router.get('/list/state/:state/city/:city', async (req, res) => {

    const { state, city } = req.params;

    try {
        const products = await Products.find({ state, city });
      
        return res.status(200).send(products);
    }
    catch (err) {
        return res.status(400).send({ error: 'Error list' });
    }
});

router.get('/list/state/:state', async (req, res) => {
    const { state } = req.params;
    try {
        const products = await Products.find({ state: state });

        return res.status(200).send(products);
    }
    catch (err) {
        return res.status(400).send({ error: 'Error lista', err });
    }
});

module.exports = app => app.use('/user/products', router);