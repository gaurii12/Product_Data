const express = require('express');
const bodyparser = require('body-parser');
 const mongodb = require('mongodb');
const app = express()
app.use(bodyparser.json());
const path = require('path'); 
app.use(bodyparser.urlencoded({ extended:true}));
app.use(bodyparser.json());

app.listen(3000)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/products', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});



const productSchema = new mongoose.Schema({
  product_name: String,
  category_id: String,
  brand: String,
  mrp: Number,
  sell_price: Number,
  description: String,
  features: String,
  img1: String,
  img2: String,
  type: String,
  colors: String,
  size: String,
  product_status: String,
  stock_status: String
});

const Product = mongoose.model('Product', productSchema);

app.get('/insert',function(req,res){
    res.sendFile(__dirname+'/insert.html');
    });

app.post('/insert', async function(req,res){
    
    try {
       
        const newProduct = new Product(req.body);
        await newProduct.save();

        res.status(201).json({ message: 'Product added successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    
});
app.get('/products', async (req, res) => {
    try {
      const products = await Product.find();
      res.render('products', { products: products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });