class Product {
    constructor(name,description,code,pic,price,stock){
        this.timestamp = new Date().toLocaleString()
        this.name = name
        this.description = description
        this.code = code
        this.pic = pic
        this.price = price
        this.stock = stock
    }
}

module.exports = Product
