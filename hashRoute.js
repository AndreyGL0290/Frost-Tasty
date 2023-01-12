import {createGroupCards, createProductCards} from './build_menu.js'
import {menu} from './menu.js'

// Create an object that maps the url to the template, title, and description
export let routes = {
	"/": {
		description: "Here you can choose the product group",
        constructor:
        {
            func: createGroupCards,
            props: menu
        }
	},
	product: {
		description: "Here you can choose the products themselves",
        constructor:
        {
            func: createProductCards,
            props: null
        }
	}
};

const locationHandler = async () => {
	var location = window.location.hash.replace("#", "");
	if (location.length == 0) {
		location = "/";
	}
	const route = routes[location];
	console.log(route)
	document
		.querySelector('meta[name="description"]')
		.setAttribute("content", route.description);
    document.getElementById('root').innerHTML = ""
    if (route.constructor) route.constructor.func(route.constructor.props)
};

locationHandler()

window.addEventListener("hashchange", locationHandler);