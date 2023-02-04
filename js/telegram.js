import {basket} from './basket.js'
import {routes} from './urlRoute.js';

export let tg = window.Telegram.WebApp

tg.expand();

tg.MainButton.color = '#FFBF00'
tg.MainButton.textColor = '#000000'
tg.MainButton.onClick(() => {
    tg.sendData(JSON.stringify(basket.products))
});

tg.BackButton.onClick(() => {
    document.getElementById('root').innerHTML = ''
    routes['/Frost-Tasty_html_pages/'].constructor.func(routes['/Frost-Tasty_html_pages/'].constructor.props)
})
