const { Router, response } = require('express')
const Cart = require('../models/cart')
const Contenedor = require('../controllers/Container')

const routerCart = Router()
const controller = new Contenedor('cart.txt')
const controllerProd = new Contenedor('product.txt')


routerCart.post('/',(req,res)=>{
    let cart = new Cart()
    res.json(controller.save(cart))
})

routerCart.get('/',async(req,res)=>{
    const allCarts = await controller.getAll()
    res.json(allCarts)
})

routerCart.get('/:id',async(req,res)=>{
let { id } = req.params 
const cartId = await controller.getById(id)
res.json(cartId)
})

routerCart.delete('/:id', async (req,res)=>{
    let { id } = req.params
    let deletedItem = await controller.deleteById(id)
    res.json(`item ${deletedItem} eliminado`)
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

routerCart.post(':id/productos', async(req,res) =>{
    let { id } = req.params
    let cart = await controller.getById(id)
    console.log(cart)
    let body = req.body.id_prod

    let products = body.forEach(id_prod => {
    let prod = controllerProd.getById(id_prod)
        cart.products.push(prod)
    })

    let response = controller.update(cart)
    res.json({Respnse: "actualizado", cart:response})

})


// routerCart.put('/:id/products',(req,res)=>{
//     let {id, products} = req.params
// })

// routerCart.delete('/:id/products/:id_prod',(req,res)=>{
//     let {id, id_prod} = req.params
//     let cart = controller.getById(id)

//     let index = cart.products.findIndex((el)=>{
//         if(el.id == id_prod){return true}
//     })

//     let newProducts = cart.products.filter((prod)=> prod.id != id_prod)
//     cart.products = newProducts
//     let response = controller.update(cart)
//     res.json({response:'product deleted', cart: response})

// })

module.exports = routerCart