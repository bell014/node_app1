const mongoose = require('mongoose');

const product = new mongoose.model ( 'Product', {
    name: {type : String, },
    description: { type: String },      
    price: { type: Number ,} ,
    image: { type: String }  
});

module.exports = product ;