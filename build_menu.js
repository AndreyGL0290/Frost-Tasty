import {routes} from './urlRoute.js'
const root = document.getElementById('root')

export function createGroupCards(menu){
    for (let i = 0; i < Object.keys(menu).length; i+=1){
        let cardContainer = document.createElement('div')
        cardContainer.className = 'card groups'

        let label = document.createElement('span')
        label.className = 'card-label'
        label.textContent = menu[Object.keys(menu)[i]].name

        let image = document.createElement('img')
        image.className = 'card-image'
        image.src = menu[Object.keys(menu)[i]].imagePath

        let button = document.createElement('a')

        button.addEventListener('click', () => {
            routes['/Frost-Tasty_html_pages/products'].constructor.props = menu[Object.keys(menu)[i]]
        })

        button.href = '/products'
        button.className = 'card-button'
        button.textContent = 'Перейти'

        cardContainer.appendChild(label)
        cardContainer.appendChild(image)
        cardContainer.appendChild(button)
        root.appendChild(cardContainer)
    }

}

export function createProductCards(products){
    for (let i = 2; i < Object.keys(products).length; i+=1){
        let cardContainer = document.createElement('div')
        cardContainer.className = 'card products'

        let label = document.createElement('span')
        label.className = 'card-label'
        label.textContent = products[Object.keys(products)[i]].name

        let image = document.createElement('img')
        image.className = 'card-image'
        image.src = products[Object.keys(products)[i]].imagePath

        let button = document.createElement('a')

        // button.addEventListener('click', () => {
        //     routes.product.constructor.props = products[Object.keys(products)[i]]
        // })

        button.className = 'card-button'
        button.textContent = 'Добавить'

        cardContainer.appendChild(label)
        cardContainer.appendChild(image)
        cardContainer.appendChild(button)

        root.appendChild(cardContainer)
    }
}