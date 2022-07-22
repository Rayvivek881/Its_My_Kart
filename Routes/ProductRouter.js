const Router = require('express').Router();
const Product = require('../Models/Product.js');

Router.post('/addProduct', async (req, res) => {
    try {
        const {name, skuCode, tag, description, price} = req.body; // address is an object;
        let Productdata  = new Product({
            name, skuCode, description, price,
            tag : [...tag]
        });
        const newProduct = await Productdata.save();
        res.status(200).json(newProduct);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

Router.delete('/deleteProduct/:id', async (req, res) => {
    try {
       const result = await Product.findByIdAndDelete(req.params.id);
       res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

Router.put('/editProduct/:id', async (req, res) => {
    try {
        const {name, description, price, tag} = req.body;
        const result = await Product.findByIdAndUpdate(req.params.id, {
            $set : {
                name, description, price,
                tag : [...tag]
            }
        }, { new : true });
        res.status(200).json(result);
     } catch (err) {
         console.log(err);
         res.status(400).json(err);
    }
});

Router.get('/viewProduct/:id', async (req, res) => {
    try {
        const result = Product.findById(req.params.id);
        if (!result){
            return res.status(400).json({message : "Product not found"});
        }
        res.status(400).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
}); 

module.exports = Router;