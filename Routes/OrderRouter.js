const Router = require('express').Router();
const Order = require('../Models/Order.js');
const Address = require('../Models/Address.js');

Router.post('/addOrder', async (req, res) => {
    try {
        const {productId, CustomerId, Estimated_Date, address, Count} = req.body; // address is an object;
        let Addressdata  = new Address({...address});
        const newAddress = await Addressdata.save();
        const OrderData = new Order({
            productId, CustomerId, Estimated_Date, Count,
            shipping : newAddress._id
        });
        const result = (await OrderData.save());
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

Router.delete('/deleteOrder/:id', async (req, res) => {
    try {
       const order = await Order.findByIdAndDelete(req.params.id).populate('shipping productId CustomerId');
       await Address.findByIdAndDelete(order.shipping._id.valueOf());
       res.status(200).json(order);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

Router.put('/editOrder/:id', async (req, res) => {
    try {
        const { address } = req.body; // addressis an object
        const order = await Order.findById(req.params.id).populate('shipping');
        const result = await Address.findByIdAndUpdate(order.shipping._id.valueOf(), {
            $set : {
                addressLine: address.addressLine,
                city: address.city,
                phone: address.phone,
                pincode: address.pincode,
                state: address.state,
            }
        }, { new : true });
        res.status(200).json(result);
     } catch (err) {
         console.log(err);
         res.status(400).json(err);
    }
});

Router.get('/viewOrder/:id', async (req, res) => {
    try {
        const result = Order.findById(req.params.id).populate('productId CustomerId shipping');
        if (!result){
            return res.status(400).json({message : "Product not found"});
        }
        res.status(400).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
}); 

module.exports = Router;