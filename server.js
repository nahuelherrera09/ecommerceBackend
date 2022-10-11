const express = require('express');

const routerProduct = require('./productos/products.route.js');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/productos',routerProduct);

app.listen(4040, err =>{
    if(err) throw new err   
    console.log('Server listening on port 8080')
})



