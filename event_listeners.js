import {basket} from './build_menu.js'
import {urlRoute} from './urlRoute.js'
import {tg} from './telegram.js'

// Used in urlRoute.js
document.addEventListener("click", (e) => {
	const { target } = e;

	// Only buttons which have classes discribed in buttons array will be handeled
	let buttons = ['groups']
	if (!buttons.includes(target.className.split(' ')[target.className.split(' ').length-1])) {
		return;
	}
	e.preventDefault();
	urlRoute();
});

// Used in build_menu.js in order to show basket button when basket is not empty and to hide it when basket is. 
document.addEventListener('click', (e) => {
    const {target} = e;
    let buttons = ['products', 'minus-sign', 'plus-sign']
    if (!buttons.includes(target.className.split(' ')[target.className.split(' ').length-1])){
        return
    }

    if (basket.products.length != 0){
        tg.MainButton.show()
        tg.MainButton.setText('Перейти в корзину')
    } else {
        tg.MainButton.hide()
    }
})
