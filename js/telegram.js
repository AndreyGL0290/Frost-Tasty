import {basket} from './basket.js'

export let tg = window.Telegram.WebApp

tg.expand();

Telegram.WebApp.onEvent("mainButtonClicked", JSON.stringify(basket.products));