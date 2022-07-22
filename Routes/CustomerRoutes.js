const Router = require('express').Router();
const Address = require('../Models/Address.js');
const Customer = require('../Models/Customer.js');

Router.post('/addCustomer', async (req, res) => {
    try {
        const {name, address} = req.body; // address is an object;
        let Addressdata  = new Address({...address});
        const newAddress = await Addressdata.save();
        let Customerdata  = new Customer({
            name : name,
            billing : newAddress._id,
        });
        const newCustomer = await Customerdata.save();
        res.status(200).json(newCustomer);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

Router.delete('/deleteCustomer/:id', async (req, res) => {
    try {
       const result = await Customer.findByIdAndDelete(req.params.id).populate('billing');
       await Address.findByIdAndDelete(result.billing._id.valueOf());
       res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

Router.put('/editCustomer/:id', async (req, res) => {
    try {
        const {name, address} = req.body; // address is an object;
        const user = await Customer.findByIdAndUpdate(req.params.id, {
            $set : {
                name : name,
            }
        }, { new : true }).populate('billing');
        if (!user){
            return res.status(400).json({message : "user not found"});
        }
        const result = await Address.findByIdAndUpdate(user.billing._id.valueOf(), {
            $set : {
                addressLine: address.addressLine,
                city: address.city,
                phone: address.phone,
                pincode: address.pincode,
                state: address.state,
            }
        }, { new : true });
        res.status(200).json({user, result});
     } catch (err) {
         console.log(err);
         res.status(400).json(err);
    }
});

Router.get('/viewCustomer/:id', async (req, res) => {
    try {
        const result = await Customer.findById(req.params.id).populate('billing');
        if (!result){
            return res.status(400).json({message : "user not found"});
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
}); 

module.exports = Router;