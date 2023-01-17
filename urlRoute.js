import { createGroupCards, createProductCards } from "./build_menu.js";
import {menu} from './menu.js'

const pageTitle = "Frost&Tasty";

// Add prefix /Frost-Tasty_html_pages in production
export let routes = {
	'/Frost-Tasty_html_pages/': {
		title: "Groups | " + pageTitle,
		description: "This is the home page",
        constructor: {
            func: createGroupCards,
            props: menu
        }
	},
	"/Frost-Tasty_html_pages/products": {
		title: "Products | " + pageTitle,
		description: "This is the about page",
        constructor: {
            func: createProductCards,
            props: null
        }
	}
};

// create a function that watches the  and calls the locationHandler
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
	const route = routes[location];
	document.title = route.title;
	document
		.querySelector('meta[name="description"]')
		.setAttribute("content", route.description);
    document.getElementById('root').innerHTML = ""
    if (route.constructor) route.constructor.func(route.constructor.props)
};

window.onpopstate = locationHandler;
// window.route = urlRoute;

locationHandler();