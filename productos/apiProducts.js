class ApiProductos {
    constructor(){
        this.productos = [];
        this.id = 0
    }

    findProduct(id){
        const product = this.productos.find((product) => product.id == id);
        return product
    }

    allProducts(){
        return[...this.productos]
    }

    saveProduct(product){
        const newProd = {...product, id: ++this.id};
        this.productos.push(newProd)
    }

    deleteById(id){
        const findId = this.productos.findIndex(p => p.id === id);
        this.productos.splice(findId,1)
    }

    deleteAll(){
        this.productos = []
    }

}

module.exports = ApiProductos