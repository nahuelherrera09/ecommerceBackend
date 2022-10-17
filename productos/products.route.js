const express = require('express');
const Contenedor = require('../controllers/Container.js');
const { Router } = express;

const Product = require('../models/products')
const controller = new Contenedor('product.txt')

const routerProduct = Router();

routerProduct.get('/',async(req,res)=>{
    const allProds = await controller.getAll()
    res.json(allProds)
} )

routerProduct.get('/:id',async(req,res)=>{
    let { id } = req.params 
    const prodId = await controller.getById(id)
    res.json(prodId)
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

routerProduct.put('/:id',async(req,res)=>{
    const id = parseInt(req.params.id)
    const { name,description,code,pic,price,stock } = req.body
    const product = await controller.update({id, name,description,code,pic,price,stock})
    res.json(product)
})

routerProduct.delete('/',(req,res)=>{
    res.json(controller.deleteAll())
} )

module.exports = routerProduct