import {routes} from './urlRoute.js'
import {tg} from './telegram.js'

const root = document.getElementById('root')

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

    addProduct(product){
        this.products[product.name] = product
        this.products[product.name].quantity = new Quantity()
    }

    getProduct(name){
        return this.products[name]
    }

    deleteProduct(name){
        delete this.products[name]
    }
}

export const basket = new Basket()

export function createGroupCards(menu){
    let innerContainer = document.createElement('div')
    innerContainer.className = 'inner-container'
    
    for (let i = 0; i < Object.keys(menu).length; i+=1){
        let cardContainer = document.createElement('div')
        cardContainer.className = 'card groups'

        let label = document.createElement('span')
        label.className = 'card-label groups'
        label.textContent = menu[Object.keys(menu)[i]].name

        let image = document.createElement('img')
        image.className = 'card-image groups'
        image.src = menu[Object.keys(menu)[i]].imagePath

        let button = document.createElement('a')

        button.addEventListener('click', () => {
            // Add prefix /Frost-Tasty_html_pages in production
            routes['/Frost-Tasty_html_pages/products'].constructor.props = menu[Object.keys(menu)[i]]
        })

        // Add prefix /Frost-Tasty_html_pages in production
        button.href = '/Frost-Tasty_html_pages/products'
        button.className = 'card-button groups'
        button.textContent = 'Перейти'

        cardContainer.appendChild(label)
        cardContainer.appendChild(image)
        cardContainer.appendChild(button)

        innerContainer.appendChild(cardContainer)
    }

    root.appendChild(innerContainer)
}

export function createProductCards(products){
    root.appendChild(createBackButton())
    
    let innerContainer = document.createElement('div')
    innerContainer.className = 'inner-container'

    // i starts with 2 because first 2 params in menu are name and image url
    for (let i = 2; i < Object.keys(products).length; i+=1){
        let cardContainer = document.createElement('div')
        cardContainer.className = 'card products'

        let label = document.createElement('span')
        label.className = 'card-label products'
        label.textContent = products[Object.keys(products)[i]].name

        let image = document.createElement('img')
        image.className = 'card-image products'
        image.src = products[Object.keys(products)[i]].imagePath

        let button = document.createElement('a')

        button.className = 'card-button products'
        button.id = i-2
        button.textContent = 'Добавить'
        
        // Creates click listener for add buttons
        button.addEventListener('click', () => {
            button.style.display = "none"

            button.parentElement.children[button.parentElement.children.length - 1].style.display = "flex"
            button.parentElement.children[button.parentElement.children.length - 1].children[1].textContent = 1
            
            basket.addProduct(products[Object.keys(products)[i]])
        })

        // Creates `+ {quantity} -` set up for added products but does not show it immediately
        let menuContainer = createProductManagementMenu(products[Object.keys(products)[i]])
        menuContainer.style.display = "none"

        if (basket.getProduct(products[Object.keys(products)[i]].name)){
            button.style.display = "none"
            menuContainer.style.display = "flex"
            menuContainer.children[1].textContent = basket.getProduct(products[Object.keys(products)[i]].name).quantity.get()
        }

        cardContainer.appendChild(label)
        cardContainer.appendChild(image)
        cardContainer.appendChild(button)
        cardContainer.appendChild(menuContainer)

        innerContainer.appendChild(cardContainer)
    }

    root.appendChild(innerContainer)
}

function createBackButton(){
    let backButton = document.createElement('img')
    backButton.src = "./images/system/back.png"
    backButton.className = "back-button"
    backButton.addEventListener('click', () => {history.back()})

    return backButton
}

function createProductManagementMenu(product){
    let menuContainer = document.createElement('div')
    menuContainer.className = 'product-menu-container'
    
    let minus = document.createElement('img')
    minus.className = 'minus-sign'
    minus.src = "./images/system/minus.png"
    minus.addEventListener('click', () => {
        basket.getProduct(product.name).quantity.decrease()
        minus.parentElement.children[1].textContent -= 1
        if (basket.getProduct(product.name).quantity.get() == 0){
            minus.parentElement.style.display = "none"
            minus.parentElement.parentElement.children[minus.parentElement.parentElement.children.length-2].style.display = "flex"
            basket.deleteProduct(product.name)
        }
    })
    
    let quantity = document.createElement('span')
    quantity.className = 'quantity-label'
    quantity.textContent = product.quantity
    
    let plus = document.createElement('img')
    plus.className = 'plus-sign'
    plus.src = "./images/system/plus.png"
    plus.addEventListener('click', () => {
        basket.getProduct(product.name).quantity.increase()
        plus.parentElement.children[1].textContent = +plus.parentElement.children[1].textContent + 1
    })

    menuContainer.appendChild(minus)
    menuContainer.appendChild(quantity)
    menuContainer.appendChild(plus)

    return menuContainer
}