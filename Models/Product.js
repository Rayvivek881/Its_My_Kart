const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    skuCode : {
        type : String,
        required : true
    },
    tag : {
        type : [String],
        default : []
    },
    description : {
        type : String,
    },
    price : {
        type : Number,
        required : true
    },
}, {timestamps: true});
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;

/*
      "skuCode": "string",
      "name": "string",
      "type": "SIMPLE",
      "description": "string",
*/