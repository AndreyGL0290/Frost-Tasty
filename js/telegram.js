import {basket} from './basket.js'

export let tg = window.Telegram.WebApp

tg.expand();
tg.MainButton.color = '#FFBF00'
tg.MainButton.textColor = '#000000'
tg.BackButton.show()
// tg.BackButton.onClick(() => {console.log('back button clicked')})

tg.onEvent("mainButtonClicked", () => {tg.sendData(JSON.stringify(basket.products))});