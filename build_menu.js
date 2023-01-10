import {menu} from './menu.js'

function createCard(props){
    let cardContainer = document.createElement('div')
    cardContainer.className = 'card'

    let label = document.createElement('span')
    label.className = 'card-label'
    label.textContent = props.name

    let image = document.createElement('img')
    image.className = 'card-image'
    image.src = props.imagePath

    let button = document.createElement('button')
    button.className = 'card-button'
    button.textContent = 'Перейти'

    cardContainer.appendChild(label)
    cardContainer.appendChild(image)
    cardContainer.appendChild(button)

    return cardContainer
}

// This part renders cards with prouduct groups 
const root = document.getElementById('root');

for (let i = 0; i < Object.keys(menu).length; i+=1){
    let element = createCard(menu[Object.keys(menu)[i]]) 
    root.appendChild(element)
}