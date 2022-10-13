const { Router } = require('express')
const Cart = require('../models/cart')
const Contenedor = require('../controllers/Container')

const routerCart = Router()
const controller = new Contenedor('cart.txt')
const controllerProd = new Contenedor('product.txt')


routerCart.post('/',(req,res)=>{
    let cart = new Cart()
    res.json(controller.save(cart))
})

routerCart.delete('/:id', (req,res)=>{
    let { id } = req.params
    res.json(controller.deleteById(id))
})

routerCart.get('/:id/products',(req,res)=>{
    let { id } = req.params

    let cart = controller.getById(id)

    if(cart.product == undefined){
        res.json({response: 'Products not found'})
    }else{
        res.json( {id:cart.id, product: cart.product} )
    }
})

routerCart.post('/:id/products',(req,res)=>{
    let { id } = req.params
    let cart = controller.getById(id)
    let body = req.body.id_prod

    let products = body.forEach(id_prod => {
        let prod = controllerProd.getById(id_prod)
        cart.products.push(prod)     
    });
    let response = controller.update(cart)
    res.json( { response: 'Products added', cart: response } )
})

routerCart.delete('/:id/products/:id_prod',(req,res)=>{
    let {id, id_prod} = req.params
    let cart = controller.getById(id)

    let index = cart.products.findIndex((el)=>{
        if(el.id == id_prod){return true}
    })

    let newProducts = cart.products.filter((prod)=> prod.id != id_prod)
    cart.products = newProducts
    let response = controller.update(cart)
    res.json({response:'product deleted', cart: response})

})

module.exports = routerCart