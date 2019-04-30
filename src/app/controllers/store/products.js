const express = require('express');
const authMiddlewares = require('../../middlewares/auth');

const Products = require('../../models/store/products');
const City = require('../../models/store/city');

const router = express.Router();


router.use(authMiddlewares);

router.get('/list/:id', async (req, res) => {

    try {
        const products = await Products.findOne({ store: req.params.id });

        return res.status(200).send(products);
    }
    catch (err) {
        return res.status(400).send({ error: 'Error list' });
    }
});

router.post('/create/:id', async (req, res) => {
    const { title, image, price, state, city } = req.body;


    try {

        let setCity;

        const products = await Products.create({ store: req.params.id, title, image, price, state, city });
        if (await City.findOne({ state })) {
            if (await City.findOne({ cityList: city })) {
            } else {
                setCity = await City.findOne({ state });
                await setCity.cityList.push(city);
                await setCity.save();
            }
        } else {
            setCity = await City.create({ state, cityList: [city] });
            await setCity.save();


        }
        await products.save();

        return res.status(200).send({ products });

    }
    catch (err) {
        return res.status(400).send({ error: 'Error' });
    }

});

router.post('/edit/:id', async (req, res) => {

    const { title, description, price } = req.body;

    try {

        const product = await Products.findOne({ admin: req.params.id });
        const _id = req.body._id;
        await product.products.id(_id).set({ title, description, price });
        await product.save();

        return res.status(200).send({ product });
    } catch (err) {
        return res.status(400).send({ error: 'Error' });
    }
});

router.post('/remove/:id', async (req, res) => {

    console.log(req.body);
    try {

        const _id = req.body._id;

        const products = await Products.findOne({ store: req.params.id });
        await products.products.id(_id).remove();
        await products.save();

        return res.status(200).send({ products });

    } catch (err) {
        return res.status(400).send({ error: 'Error deleting project' });
    }
});


module.exports = app => app.use('/products', router);