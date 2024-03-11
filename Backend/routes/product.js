const express = require('express');
const router = express.Router();
const product = require('../models/product'); // Assuming your product model
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './uploads', // Change this path if needed
  filename: (req, file, cb) => {
    const date = Date.now(); // Use Date.now() for timestamp
    const filename = `${date}.${file.mimetype.split('/')[1]}`;
    cb(null, filename); // Pass filename to callback
  },
});

const upload = multer({ storage }); // Use storage directly

// Create (POST) a new product
router.post('/addproduct', upload.single('image'), async (req, res) => { // Use upload.single('fieldname') for single file
  try {
    if (!req.file) { // Check if a file was uploaded
      return res.status(400).send('No file uploaded');
    }

    const data = req.body;
    data.image = req.file.filename; // Access uploaded file details
    const newProduct = new product(data);
    await newProduct.save();
    res.status(200).send("Data added successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send("Error adding new product");
  }
});

  
  // Read (GET) all products


  router.get('/products', async (req, res) => {
    try {
      const products = await product.find();
      res.status(200).json(products);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching products');
    }
  });
  
  // Read (GET) a product by ID
  router.get('/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const product = await product.findById(id);
      if (!product) {
        return res.status(404).send('Product not found');
      }
      res.status(200).json(product);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching product');
    }
  });
  
  // Update (PUT) a product by ID
  router.put('/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedProduct = await product.findByIdAndUpdate(id, updateData, { new: true }); // Returns the updated product
      if (!updatedProduct) {
        return res.status(404).send('Product not found');
      }
      res.status(200).send('Product updated successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating product');
    }
  });
  
  // Delete (DELETE) a product by ID
   router.delete('/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProduct = await product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).send('Product not found');
      }
      res.status(200).send('Product deleted successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting product');
    }
  }); 









module.exports = router ;