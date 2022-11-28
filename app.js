const express = require('express')
const app = express()
const fs = require('fs')
const port = 3000
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('page'))
const CATS_URL = '/api/cats'
const CATS_PRODUCTS_URL = '/cats_products'
const PRODUCTS_URL = '/api/products'
const PRODUCTS_COMMENTS_URL = '/api/products/products_comments'
const CART_URL = '/api/user_cart'


app.get('/cats', (req, res) => {
  const result = fs.readFileSync('./json/cats/cat.json')
  res.send(result)
})

app.get('/cats_products/:id', (req, res) => {
  const result = fs.readFileSync(`./json/cats_products/${req.params.id}`)
  res.send(result)
})
app.get('/products/:id', (req, res) => {
  const result = fs.readFileSync(`./json/products/${req.params.id}`)
  res.send(result)
})
app.get('/products_comments/:id', (req, res) => {
  const result = fs.readFileSync(`./json/products_comments/${req.params.id}`)
  res.send(result)
})
app.get('/user_cart/:25801', (req,res) => {
  const result = fs.readFileSync('./json/user_cart/25801.json')
  res.send(result)
})

app.listen(port, () => {
  console.log(`Lanzando Mi APP en el puerto ${port}`)
})