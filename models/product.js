const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
},
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    number: {
        type: Number
    }
});

module.exports = mongoose.model("Product", productSchema);