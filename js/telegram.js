import {createBasketMenu} from './build_menu.js'
import {basket} from './basket.js'

export let tg = window.Telegram.WebApp

tg.expand();

Telegram.WebApp.onEvent("mainButtonClicked", createBasketMenu(basket.products));