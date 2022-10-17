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


    routerCart.get('/:id',async(req,res)=>{
    let { id } = req.params 
    const cartId = await controller.getById(id)
    res.json(cartId)
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

// routerCart.put('/:id/products',(req,res)=>{
//     let {id, products} = req.params
// })

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