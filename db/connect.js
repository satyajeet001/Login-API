const mongoose = require("mongoose");

// const uri = "mongodb+srv://kiitstudent123:kiitstudent123@atlascluster.whnzzfb.mongodb.net/AtlasCluster?retryWrites=true&w=majority";

const connectDB = (uri) => {
    console.log("Connected to dataBase");
    return mongoose.connect(uri, {
        useNewUrlParser: true,
    });
}

module.exports = connectDB;