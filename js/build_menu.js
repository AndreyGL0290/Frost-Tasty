import {basket} from './basket.js'
import {tg} from './telegram.js'
import {menu} from './menu.js'
import {urlPath} from './urlPath.js'

// TODO:
// 1) Center basket content
// 2) Get button to the page bottom

const root = document.getElementById('root')

export function createGroupCards(menu){
    if (tg.MainButton.isVisible) tg.MainButton.hide()
    if (tg.BackButton.isVisible) tg.BackButton.hide()

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

        button.href = urlPath + '/products#' + Object.keys(menu)[i]
        button.className = 'card-button groups'
        button.textContent = 'Перейти'

        cardContainer.appendChild(label)
        cardContainer.appendChild(image)
        cardContainer.appendChild(button)

        innerContainer.appendChild(cardContainer)
    }

    root.appendChild(innerContainer)
    if (Object.keys(basket.products).length != 0) root.appendChild(createBasketButton())
}

export function createProductCards(){
    if (tg.MainButton.isVisible) tg.MainButton.hide()
    let categoryName = window.location.hash.replace('#', '') // Getting chosen category from hash
    let products = menu[categoryName] // Getting products to render

    if (!tg.BackButton.isVisible) tg.BackButton.show()
    
    let innerContainer = document.createElement('div')
    innerContainer.className = 'inner-container'

    for (let i = 0; i < Object.keys(products).length; i+=1){
        if (!(typeof products[Object.keys(products)[i]] == 'object')) continue

        let cardContainer = document.createElement('div')
        cardContainer.className = 'card'

        let label = document.createElement('span')
        label.className = 'card-label'
        label.textContent = products[Object.keys(products)[i]].name

        let image = document.createElement('img')
        image.className = 'card-image'
        image.src = products[Object.keys(products)[i]].imagePath

        let productPrice = document.createElement('span')
        productPrice.className = 'card-price'
        if (products[Object.keys(products)[i]].postfix) productPrice.textContent = products[Object.keys(products)[i]].price + products[Object.keys(products)[i]].postfix
        else productPrice.textContent = products[Object.keys(products)[i]].price + ' ₾/кг'

        let button = document.createElement('a')

        button.className = 'card-button products'
        button.id = i-2
        button.textContent = 'Добавить'
        
        // Creates click listener for add buttons
        button.addEventListener('click', () => {
            button.style.display = "none"

            button.parentElement.children[button.parentElement.children.length - 1].style.display = "flex"
            button.parentElement.children[button.parentElement.children.length - 1].children[1].textContent = 1
            
            basket.addProduct(products[Object.keys(products)[i]].name, categoryName, products[Object.keys(products)[i]])
        })

        // Creates `+ {quantity} -` set up for added products but does not show it immediately
        let menuContainer = createProductManagementMenu(products[Object.keys(products)[i]])
        menuContainer.style.display = "none"
        // If user choosed something earlier in that group we render it 
        if (basket.getProduct(products[Object.keys(products)[i]].name)){
            if (basket.getProduct(products[Object.keys(products)[i]].name).name == products[Object.keys(products)[i]].name){
                button.style.display = "none"
                menuContainer.style.display = "flex"
                menuContainer.children[1].textContent = basket.getProduct(products[Object.keys(products)[i]].name).quantity.get()
            }
        }

        cardContainer.appendChild(label)
        cardContainer.appendChild(image)
        cardContainer.appendChild(productPrice)
        cardContainer.appendChild(button)
        cardContainer.appendChild(menuContainer)

        innerContainer.appendChild(cardContainer)
    }

    root.appendChild(innerContainer)
    
    if (Object.keys(basket.products).length != 0) root.appendChild(createBasketButton())
}

export function createBasketButton(){
    let basketButtonContainer = document.createElement('div')
    basketButtonContainer.className = 'basket-button-container'

    let basketButton = document.createElement('a')
    basketButton.className = 'basket-button'
    basketButton.textContent = "Continue"
    basketButton.href = urlPath + "/basket"

    basketButtonContainer.appendChild(basketButton)

    return basketButtonContainer
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
            
            if (Object.keys(basket.products).length == 0) {document.getElementsByClassName('basket-button')[0].remove()}
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
    console.log(tg.MainButton)
    if (!tg.BackButton.isVisible) tg.BackButton.show()

    let basketContainer = document.createElement('div')
    basketContainer.className = 'basket-container'

    for (let i = 0; i < Object.keys(products).length; i+=1){
        // Card element (main)
        let cardContainer = document.createElement('div')
        cardContainer.className = 'in-basket-product'
        cardContainer.id = i

        // Cross button
        let deleteButton = document.createElement('a')
        deleteButton.className = 'delete-button'
        deleteButton.data = i
        
        // Deletes an element from basket and from user page when clicked
        deleteButton.addEventListener('click', () => {
            basket.deleteProduct(document.getElementById(deleteButton.data).children[0].children[1].textContent)
            document.getElementById(deleteButton.data).remove()
            if (Object.keys(basket.products).length == 0){
                document.getElementsByClassName('basket-container')[0].remove()
                
                let afterLabelContainer = document.createElement('div')
                afterLabelContainer.className = 'after-label-container'
                
                let afterLabel = document.createElement('span')
                afterLabel.innerHTML = 'Ваша корзина пуста<br>Посмтрите что-нибудь еще<br><br>'
                
                let getMoreButton = document.createElement('a')
                getMoreButton.className = 'get-more-button'
                getMoreButton.innerHTML = 'Посмотреть<br><br>'
                getMoreButton.href = urlPath + '/'
                
                afterLabelContainer.appendChild(afterLabel)
                afterLabelContainer.appendChild(getMoreButton)
                
                // For production
                tg.MainButton.hide()
                //
                
                
                if (document.getElementById('root')) {
                    document.getElementById('root').appendChild(afterLabelContainer)
                }
            }
        })

        // Containers
        let imagesContainer = document.createElement('div')
        imagesContainer.className = 'images-container'

        let additionalContentContainer = document.createElement('div')
        additionalContentContainer.className = 'add-content-container'

        let contentContainer = document.createElement('div')
        contentContainer.className = 'content-container'

        // Eye button
        let showProductButton = document.createElement('a')
        showProductButton.className = 'show-product-button'
        showProductButton.href = 'products#' + products[Object.keys(products)[i]].parent

        // Product name label
        let productLabel = document.createElement('span')
        productLabel.className = 'product-label'
        productLabel.textContent = products[Object.keys(products)[i]].name
        productLabel.data = i

        // Product quantity label
        let productQuantity = document.createElement('span')
        productQuantity.className = 'product-quantity'

        if (products[Object.keys(products)[i]].postfix) productQuantity.textContent = products[Object.keys(products)[i]].quantity.get() + ' шт'
        else productQuantity.textContent = products[Object.keys(products)[i]].quantity.get() + ' кг'

        // Product price label
        let productPrice = document.createElement('span')
        productPrice.className = 'product-price'
        productPrice.textContent = products[Object.keys(products)[i]].price * products[Object.keys(products)[i]].quantity.get() + ' ₾'

        // Combine simple elements on divs
        imagesContainer.appendChild(deleteButton)
        imagesContainer.appendChild(showProductButton)
        
        additionalContentContainer.appendChild(productQuantity)
        additionalContentContainer.appendChild(productPrice)

        contentContainer.appendChild(imagesContainer)
        contentContainer.appendChild(productLabel)

        // Appends all daughter elemnts into main element
        cardContainer.appendChild(contentContainer)
        cardContainer.appendChild(additionalContentContainer)


        // Appends main element into the page html
        basketContainer.appendChild(cardContainer)
        basketContainer.appendChild(document.createElement('br'))
    }

    if (document.getElementById('root')) document.getElementById('root').appendChild(basketContainer)

    // For production
    tg.MainButton.show()
    tg.MainButton.setText('Далее')
}