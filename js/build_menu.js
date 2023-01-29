import {basket} from './basket.js'
import {routes} from './urlRoute.js'
import {tg} from './telegram.js'
import { menu } from './menu.js'


const root = document.getElementById('root')

export function createGroupCards(menu){
    let innerContainer = document.createElement('div')
    innerContainer.className = 'inner-container'
    
    for (let i = 0; i < Object.keys(menu).length; i+=1){
        let cardContainer = document.createElement('div')
        cardContainer.className = 'card'

        let label = document.createElement('span')
        label.className = 'card-label'
        label.textContent = menu[Object.keys(menu)[i]].name

        let image = document.createElement('img')
        image.className = 'card-image'
        image.src = menu[Object.keys(menu)[i]].imagePath

        let button = document.createElement('a')

        button.addEventListener('click', () => {
            // Add prefix /Frost-Tasty_html_pages in production
            routes['/products'].constructor.props = {parent: Object.keys(menu)[i], content: menu[Object.keys(menu)[i]]}
        })

        // Add prefix /Frost-Tasty_html_pages in production
        button.href = '/products'
        button.className = 'card-button groups'
        button.textContent = 'Перейти'

        cardContainer.appendChild(label)
        cardContainer.appendChild(image)
        cardContainer.appendChild(button)

        innerContainer.appendChild(cardContainer)
    }

    root.appendChild(innerContainer)
}

export function createProductCards(data){
    root.appendChild(createBackButton())
    
    let innerContainer = document.createElement('div')
    innerContainer.className = 'inner-container'

    // i starts with 2 because first 2 params in menu are name and image url
    for (let i = 0; i < Object.keys(data.content).length; i+=1){
        if (!(typeof data.content[Object.keys(data.content)[i]] == 'object')) continue
        let cardContainer = document.createElement('div')
        cardContainer.className = 'card'

        let label = document.createElement('span')
        label.className = 'card-label'
        label.textContent = data.content[Object.keys(data.content)[i]].name

        let image = document.createElement('img')
        image.className = 'card-image'
        image.src = data.content[Object.keys(data.content)[i]].imagePath

        let button = document.createElement('a')

        button.className = 'card-button products'
        button.id = i-2
        button.textContent = 'Добавить'
        
        // Creates click listener for add buttons
        button.addEventListener('click', () => {
            button.style.display = "none"

            button.parentElement.children[button.parentElement.children.length - 1].style.display = "flex"
            button.parentElement.children[button.parentElement.children.length - 1].children[1].textContent = 1
            
            basket.addProduct(data.content[Object.keys(data.content)[i]].name, data.parent, data.content[Object.keys(data.content)[i]])
        })

        // Creates `+ {quantity} -` set up for added products but does not show it immediately
        let menuContainer = createProductManagementMenu(data.content[Object.keys(data.content)[i]])
        menuContainer.style.display = "none"
        // If user choosed something earlier in that group we render it 
        if (basket.getProduct(data.content[Object.keys(data.content)[i]].name)){
            if (basket.getProduct(data.content[Object.keys(data.content)[i]].name).name == data.content[Object.keys(data.content)[i]].name){
                button.style.display = "none"
                menuContainer.style.display = "flex"
                menuContainer.children[1].textContent = basket.getProduct(data.content[Object.keys(data.content)[i]].name).quantity.get()
            }
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
            
            // For development {
            if (Object.keys(basket.products).length == 0) {document.getElementsByTagName('footer')[0].remove()}
            // }

            // For production
            if (Object.keys(basket.products).length == 0) tg.MainButton.hide()
            //
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

export function createBasketMenu(products){
    for (let i = 0; i < Object.keys(products).length; i+=1){
        let cardContainer = document.createElement('div')
        cardContainer.className = 'in-basket-product'
    
        let deleteButton = document.createElement('img')
        deleteButton.className = 'delete-button'
        deleteButton.src = './images/system/cross.png'
    
        let showProductButton = document.createElement('img')
        showProductButton.className = 'show-product-button'
        showProductButton.src = './images/system/eye.png'

        showProductButton.addEventListener('click', () => {
            root.innerHTML = ''
            createProductCards({parent: products[Object.keys(products)[i]].parent, content: menu[products[Object.keys(products)[i]].parent]})
        })
    
        let productLabel = document.createElement('span')
        productLabel.className = 'product-label'
        productLabel.textContent = products[Object.keys(products)[i]].name
        
        let productQuantity = document.createElement('span')
        productQuantity.className = 'product-quantity'
        productQuantity.textContent = products[Object.keys(products)[i]].quantity.get()

        let productPrice = document.createElement('span')
        productPrice.className = 'product-price'
        productPrice.textContent = products[Object.keys(products)[i]].price
        
        cardContainer.appendChild(deleteButton)
        cardContainer.appendChild(showProductButton)
        cardContainer.appendChild(productLabel)
        cardContainer.appendChild(productQuantity)
        cardContainer.appendChild(productPrice)

        root.appendChild(cardContainer)
    }
    // Development
    if (document.getElementsByTagName('footer').length != 0){
        document.getElementsByTagName('footer')[0].textContent = 'Confirm'
    }
    //
}