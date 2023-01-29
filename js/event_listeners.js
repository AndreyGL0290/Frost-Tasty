import {basket} from './basket.js'
import {urlRoute, routes} from './urlRoute.js'
import {tg} from './telegram.js'
import {createBasketButton} from './build_menu.js'

// Used in urlRoute.js
document.addEventListener("click", (e) => {
	const { target } = e;

	// Only buttons which have classes discribed in buttons array will be handeled
    // NOTICE: classes in buttons have to be elements last given class name
	let buttons = ['groups', 'back-button', 'basket-button', 'show-product-button', 'get-more-button']
	if (!buttons.includes(target.classList[target.classList.length-1])) {
		return;
	}
	e.preventDefault();
	urlRoute();
});

// Used in build_menu.js in order to show basket button when basket is not empty and to hide it when basket is. 
document.addEventListener('click', (e) => {
    const {target} = e;
    let buttons = ['products', 'plus-sign']
    if (!buttons.includes(target.className.split(' ')[target.className.split(' ').length-1])){
        return
    }

    if (basket.products.length != 0){

        // For development {
        if (!document.getElementsByClassName('basket-button')[0]){
            let basketButton = createBasketButton()
            routes['/basket'].constructor.props = basket.products

            document.getElementsByClassName('middle-container')[0].appendChild(basketButton)
        }
        // }

        tg.MainButton.show()
        tg.MainButton.setText('Перейти в корзину')
    }
})
