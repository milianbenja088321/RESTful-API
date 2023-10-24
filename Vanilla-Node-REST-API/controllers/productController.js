const Product = require('../models/productModel')

const { getPostData } = require('../utils')

// @desc Gets All Products
// @route Get /api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log(error)
    }
}

// @desc Gets single products
// @route GET /api/products
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id)
        console.log('Id: ' + id)
        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: "Product Not Found" }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(product))
        }
    } catch (error) {
        console.log(error)
    }
}


// @desc Craete a Product
// @route POST /api/products
async function createProduct(req, res) {
    try {

        const body = await getPostData(req)

        const { title, description, price } = JSON.parse(body)

        const product = {
            title,
            description,
            price
        }

        const newProduct = await Product.create(product)

        res.writeHead(201, { 'Content-Type': 'application/js' })
        return res.end(JSON.stringify(newProduct))


    } catch (error) {
        console.log(error)
    }
}

// @desc Craete a Product
// @route POST /api/products
async function updateProduct(req, res, id) {
    try {

        const body = await getPostData(req)

        const { title, description, price } = JSON.parse(body)

        const product = {
            title,
            description,
            price
        }

        const newProduct = await Product.create(product)

        res.writeHead(201, { 'Content-Type': 'application/js' })
        return res.end(JSON.stringify(newProduct))


    } catch (error) {
        console.log(error)
    }
}

// @desc Update a Product
// @route Put /api/products/:id
async function updateProduct(req, res, id) {
    try {
        const product = await Product.findById(id)

        if(!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            const body = await getPostData(req)

            const { name, description, price } = JSON.parse(body)

            const productData = {
                name: name || product.name,
                description: description || product.description,
                price: price || product.price
            }

            const updProduct = await Product.update(id, productData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            console.log(JSON.stringify(updProduct));
            return res.end(JSON.stringify(updProduct)) 
        }
 

    } catch (error) {
        console.log(error)
    }
}

// @desc Deletes a single products
// @route DELETE /api/products
async function removeProduct(req, res, id) {
    try {
        const product = await Product.findById(id)
        console.log('Id: ' + id)
        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: "Product Not Found" }))
        } else {
            await Product.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({message: `Product ${id} removed`}))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    removeProduct
}