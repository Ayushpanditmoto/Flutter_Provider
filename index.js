const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000

// Use body parser to parse the body of the request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
})

const Product = mongoose.model('Product', ProductSchema)
//create a new product
app.post('/api/v1/product', async (req, res) => {
  const product = await Product.create(req.body)
  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: product,
  })
})

//find products by id
app.get('/api/v1/product/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    })
  }
  res.status(200).json({
    success: true,
    message: 'Product found',
    data: product,
  })
})

//get all products
app.get('/api/v1/products', async (req, res) => {
  const products = await Product.find()
  res.status(200).json({
    success: true,
    message: 'Products retrieved successfully',
    data: products,
  })
})

//update a product
app.put('/api/v1/product/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    data: product,
  })
})
//delete a product
app.delete('/api/v1/product/:id', async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)
  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
    data: product,
  })
})

// Connect to MongoDB
mongoose
  .connect(
    'mongodb+srv://rashumi:rashumi@esarkari.xepcu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('MongoDB Connected')
  })
  .catch((err) => {
    console.log(err)
  })

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
