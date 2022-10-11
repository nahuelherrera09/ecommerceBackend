class Carrito {
    constructor(){
        this.productosCarrito = [];
        this.id = 0 
    }

    newCart(){
        
    }   

    findProduct(id){
        const product = this.productosCarrito.find((product) => product.id == id);
        return product
    }

    allProducts(){
        return[...this.productosCarrito]
    }

    deleteById(id){
        const findId = this.productosCarrito.findIndex(p => p.id === id);
        this.productosCarrito.splice(findId,1)
    }

    deleteCart(){
        this.productosCarrito = []
    }

}

module.exports = Carrito