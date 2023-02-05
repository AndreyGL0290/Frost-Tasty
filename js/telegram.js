import {basket} from './basket.js'
import {routes} from './urlRoute.js';

export let tg = window.Telegram.WebApp

tg.expand();

tg.MainButton.color = '#FFBF00'
tg.MainButton.textColor = '#000000'
Telegram.WebApp.onEvent('mainButtonClicked', () => {
    let data = {}

    // Shortens basket product data so only valuable information is send
    for (let i = 0; i < Object.keys(basket.products).length; i += 1){
        data[Object.keys(basket.products)[i]] = {'price': basket.products[Object.keys(basket.products)[i]].price, 'quantity': basket.products[Object.keys(basket.products)[i]].quantity.get()}
    }
    
    console.log(data)

    tg.sendData(JSON.stringify(data))
});

tg.BackButton.onClick(() => {
    document.getElementById('root').innerHTML = ''
    routes['/Frost-Tasty_html_pages/'].constructor.func(routes['/Frost-Tasty_html_pages/'].constructor.props)
})
