import {basket} from './build_menu.js'
export let tg = window.Telegram.WebApp

tg.expand();

Telegram.WebApp.onEvent("mainButtonClicked", function(){
	tg.sendData(JSON.stringify(basket));
});