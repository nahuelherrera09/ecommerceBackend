const express = require('express');
const ApiProductos = require('./apiProducts');
const { Router } = express;

const routerProduct = Router();

routerProduct.get('/',(req,res)=>{
    res.json(ApiProductos.allProducts())
} )

routerProduct.get('/:id',(req,res)=>{
    res.json(ApiProductos.findProduct(req.params.id))
})

routerProduct.delete('/:id',(req,res)=>{
    res.json(ApiProductos.deleteById(req.params.id))
})

routerProduct.post('/',(req,res)=>{
    res.json(ApiProductos.saveProduct(req.body))
})

routerProduct.delete('/',(req,res)=>{
    res.json(ApiProductos.deleteAll())
} )

module.exports = routerProduct