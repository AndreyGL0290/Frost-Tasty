import {basket} from './build_menu'
export let tg = window.Telegram.WebApp

tg.expand();

Telegram.WebApp.onEvent("mainButtonClicked", function(){
	tg.sendData(basket);
});