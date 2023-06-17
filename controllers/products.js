require("dotenv").config();
const connectDB = require("../db/connect");
const Product = require("../models/product");

const ProductJson = require("../product.json");


const getAllProducts = async (req, res) => {
    try {
        await connectDB(process.env.MONGODB_URL);
        await Product.create(ProductJson);
        res.status(200).send("Successfully Signed Up");
    } catch (error){
        console.log(error);
    }
};

const getAllProductsTesting = async () => {
    
};

module.exports = {getAllProducts, getAllProductsTesting};