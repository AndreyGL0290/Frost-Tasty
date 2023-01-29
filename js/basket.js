// Represents amount of chosen product
class Quantity{
    constructor(){
        this.quantity = 1
    }
    
    get(){
        return this.quantity
    }

    increase(){
        this.quantity += 1
    }

    decrease(){
        this.quantity -= 1
    }

}

// Here all products that user chooses are stored
class Basket{
    constructor(){
        this.products = {}
    }

    addProduct(name, parent, product){
        product.parent = parent
        this.products[name] = product
        this.products[name].quantity = new Quantity()
    }

    getProduct(name){
        return this.products[name]
    }

    deleteProduct(name){
        delete this.products[name]
    }
}

export const basket = new Basket()