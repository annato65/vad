const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {type: String, required: true, max: 100},
    description: {type: String, required: true, max: 600},
    pictureUrl: {type: String, required: true, max: 30},
    price: {type: String, required: true},
   
});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);