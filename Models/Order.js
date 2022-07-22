const mongoose = require('mongoose');
const OrderSchema = mongoose.Schema({
    productId : {
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    },
    CustomerId : {
        type: mongoose.Types.ObjectId,
        ref: 'Customer'
    },
    Count : {
        type : Number,
        default : 1
    },
    shipping : {
        type : mongoose.Types.ObjectId,
        ref : "Address"
    },
    Estimated_Date : {
        type : String,
        default : JSON.stringify(Date.now())
    }
}, {timestamps: true});
const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;