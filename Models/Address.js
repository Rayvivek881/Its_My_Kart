const mongoose = require('mongoose');
const AddressSchema = mongoose.Schema({
    city: { 
        type : String
    },
    state: { 
        type : String 
    },
    phone: { 
        type : String 
    },
    pincode: {
        type : String 
    },
    addressLine: { 
        type : String 
    }
}, {timestamps: true});
const Address = mongoose.model('Address', AddressSchema);
module.exports = Address;