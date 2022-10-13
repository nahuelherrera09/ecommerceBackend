const express = require('express');
const Contenedor = require('../controllers/Container.js');
const { Router } = express;

const Product = require('../models/products')
const controller = new Contenedor('product.txt')

const routerProduct = Router();

routerProduct.get('/',(req,res)=>{
    res.json(controller.getAll())
} )

routerProduct.get('/:id',(req,res)=>{
    let { id } = req.params 
    res.json(controller.getById(id))
})

routerProduct.delete('/:id',(req,res)=>{
    let { id } = req.params
    res.json(controller.deleteById(id))
})

routerProduct.post('/',(req,res)=>{
    let body = req.body
    let product = new Product(body.name,body.description,body.code,body.pic,body.price,body.stock)
    res.json(controller.save(product))
})

routerProduct.delete('/',(req,res)=>{
    res.json(controller.deleteAll())
} )

module.exports = routerProduct