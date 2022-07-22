const mongoose = require('mongoose');
const CustomerSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    billing : {
        type : mongoose.Types.ObjectId,
        ref : "Address"
    },
}, {timestamps: true});
const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;