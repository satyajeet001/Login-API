require('dotenv').config();
const express = require("express");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

const productsRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const connectDB = require("./db/connect");

app.get("/", function(req, res) {
  res.send("Welcome!");
});

app.use("/api/products", productsRoutes);
app.use("/api/user", userRoutes);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`${PORT} I'm connected`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
