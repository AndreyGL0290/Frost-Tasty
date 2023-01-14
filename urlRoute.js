import { createGroupCards, createProductCards } from "./build_menu.js";
import {menu} from './menu.js'

const pageTitle = "Frost&Tasty";

// create document click that watches the nav links only
document.addEventListener("click", (e) => {
	const { target } = e;
	if (!target.className == 'card-button') {
		return;
	}
	e.preventDefault();
	urlRoute();
});

// create an object that maps the  to the template, title, and description
export let routes = {
	"/": {
		title: "Groupes | " + pageTitle,
		description: "This is the home page",
        constructor: {
            func: createGroupCards,
            props: menu
        }
	},
	"/products": {
		title: "Products | " + pageTitle,
		description: "This is the about page",
        constructor: {
            func: createProductCards,
            props: null
        }
	}
};

// create a function that watches the  and calls the locationHandler
const urlRoute = (event) => {
	event = event || window.event; // get window.event if event argument not provided
	event.preventDefault();
	// window.history.pushState(state, unused, target link);
	window.history.pushState({}, "", event.target.href);
	locationHandler();
};

// create a function that handles the  location
const locationHandler = async () => {
	const location = window.location.pathname;
	if (location.length == 0) {
        location = "/";
	}
    console.log(location)
	const route = routes[location];
	document.title = route.title;
	document
		.querySelector('meta[name="description"]')
		.setAttribute("content", route.description);
    document.getElementById('root').innerHTML = ""
    if (route.constructor) route.constructor.func(route.constructor.props)
};

window.onpopstate = locationHandler;

window.route = urlRoute;

locationHandler();