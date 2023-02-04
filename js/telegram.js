import {basket} from './basket.js'

export let tg = window.Telegram.WebApp

tg.expand();

tg.BackButton.show()
// tg.BackButton.onClick(() => {console.log('back button clicked')})

tg.onEvent("mainButtonClicked", () => {tg.sendData(JSON.stringify(basket.products))});