const express = require('express');
const ApiProductos = require('./apiProducts');
const { Router } = express;

const products = new ApiProductos()

const routerProduct = Router();

routerProduct.get('/',(req,res)=>{
    res.json(products.allProducts())
} )

routerProduct.get('/:id',(req,res)=>{
    res.json(products.findProduct(req.params.id))
})

routerProduct.delete('/:id',(req,res)=>{
    res.json(products.deleteById(req.params.id))
})

routerProduct.post('/',(req,res)=>{
    res.json(products.saveProduct(req.body))
})

routerProduct.delete('/',(req,res)=>{
    res.json(products.deleteAll())
} )

module.exports = routerProduct