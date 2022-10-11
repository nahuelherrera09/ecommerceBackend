const express = require('express');
const { findProduct, allProducts, saveProduct, deleteById, deleteAll  } = require('./apiProducts');

const { Router } = express;

const routerProduct = Router();

routerProduct.get('/', allProducts)

routerProduct.get('/:id',findProduct)

routerProduct.post('/', saveProduct)

routerProduct.delete('/:id', deleteById)

routerProduct.delete('/', deleteAll)

module.exports = routerProduct