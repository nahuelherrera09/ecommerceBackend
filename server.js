const express = require('express');
const routerCart = require('./carrito/cart.route.js');

const routerProduct = require('./productos/products.route.js');

const PORT = process.env.PORT || 3000

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/productos',routerProduct);
app.use('/api/cart', routerCart)

app.listen(PORT, err =>{
    if(err) throw new err   
    console.log('Server listening on port 3000')
})



