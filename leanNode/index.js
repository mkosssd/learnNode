const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/productModel')

const app = express()
const port = 3000


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get product by ID

app.get('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//edit product 
app.put('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product) {
            return res.status(404).json({ message: "Product not found!" })
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//add a product 

app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.delete('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        if (!product) { return res.status(404).json({ message: "Product not found!" }) }

        res.status(200).json({ message: "Product deleted successfully!" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})



mongoose.connect('mongodb+srv://manaskies19:hJBKP7u7gaFhfqP9@cluster0.0nkis.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected!')
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    }).catch((e) => console.log(e))
