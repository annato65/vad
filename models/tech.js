const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TechSchema = new Schema({
    headName: {type: String, required: true, max: 100},
    pictureUrl1: {type: String, max: 100},
    description: {type: String, required: true, max: 1600},
    pictureUrl2: {type: String, max: 100},
});

// Export the model
module.exports = mongoose.model('Tech', TechSchema);