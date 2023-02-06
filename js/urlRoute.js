import { createBasketMenu, createGroupCards, createProductCards } from "./build_menu.js";
import {menu} from './menu.js'

const pageTitle = "Frost&Tasty";

export let routes = {
	'': {
		title: "Groups | " + pageTitle,
		description: "This is the home page",
		constructor: {
			func: createGroupCards,
			props: menu
		}
	},

	"products": {
		title: "Products | " + pageTitle,
		description: "This is the about page",
        constructor: {
            func: createProductCards,
            props: null
        }
	},
	'basket': {
		title: "Basket | " + pageTitle,
		description: "Here you can check products you've chosen",
        constructor: {
            func: createBasketMenu,
            props: null
        }
	}
};

export const urlRoute = (event) => {
	event = event || window.event; // get window.event if event argument not provided
	event.preventDefault();
	
	// window.history.pushState(state, unused, target link);
	window.history.pushState({}, "", event.target.href);

	locationHandler();
};

// create a function that handles the  location
const locationHandler = async () => {
	const location = window.location.pathname;
	const route = routes[location.split('/')[location.split('/').length-1]];
	document.title = route.title;
	document
		.querySelector('meta[name="description"]')
		.setAttribute("content", route.description);
    document.getElementById('root').innerHTML = ""
	window.scrollTo(0,0);
    if (route.constructor) route.constructor.func(route.constructor.props)
};

window.onpopstate = locationHandler;
// window.route = urlRoute;

locationHandler();