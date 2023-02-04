import {basket} from './basket.js'

export let tg = window.Telegram.WebApp

tg.expand();

tg.onEvent("mainButtonClicked", () => {tg.sendData(JSON.stringify(basket.products))});