let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";


Telegram.WebApp.onEvent("mainButtonClicked", function(){
	tg.sendData();
});

let usercard = document.getElementsByClassName("usercard")[0];

let p = document.createElement("p");

p.innerText = `${tg.initDataUnsafe.user.first_name}
${tg.initDataUnsafe.user.last_name}`;


usercard.appendChild(p); 
