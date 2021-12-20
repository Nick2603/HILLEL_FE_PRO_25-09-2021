const userData = (function () {

	const minName = 5;

	const maxName = 20;

	return {

		firstName: function () {

			const validateName = function (input) {

				return !isNaN(input) || input.trim().length < minName || input.trim().length > maxName;

			};

			let firstName = STDIN.getStringInput(`Put your first name: only letters, min: ${minName}, max: ${maxName}`, validateName);

			return firstName;

		},

		lastName: function () {

			const validateName = function (input) {

				return !isNaN(input) || input.trim().length < minName || input.trim().length > maxName;

			};

			let lastName = STDIN.getStringInput(`Put your last name: only letters, min: ${minName}, max: ${maxName}`, validateName);

			return lastName;

		},

		age: function () {

			const minYear = 1900;

			const validateYear = function (input) {

				return isNaN(input) || input < minYear || input > new Date().getFullYear();

			};

			let yearOfBirth = STDIN.getNumberInput(`Put your year of birth: only numbers, min: ${minYear}, max: ${new Date().getFullYear()}`, validateYear)

			const minMonth = 1;

			const maxMonth = 12;

			const validateMonth = function (input) {

				return isNaN(input) || input < minMonth || input > maxMonth;

			};

			let monthOfBirth = STDIN.getNumberInput(`Put your month of birth: only numbers, min: ${minMonth}, max: ${maxMonth}`, validateMonth);

			const minDay = 1;

			let maxDay = DATE.doMaxDay(monthOfBirth, yearOfBirth);

			const validateDay = function (maxDay) {

				return function (input) {

					return isNaN(input) || input < minDay || input > maxDay;

				};

			};

			let dayOfBirth = STDIN.getNumberInput(`Put your day of birth: only numbers, min: ${minDay}, max: ${maxDay}`, validateDay(maxDay));

			const originalBirthDay = new Date(yearOfBirth, monthOfBirth - 1, dayOfBirth);

			const BirthDay = new Date(new Date().getFullYear(), monthOfBirth - 1, dayOfBirth);

			let age = BirthDay.getFullYear() - originalBirthDay.getFullYear();

			if (new Date() > BirthDay) {

				return age;

			} else {

				return age - 1;

			};

		},

		date: function () {

			return DATE.getDateByFormat('dd/mm/yyyy hh:mm');

		},

	};

})();

const DOM = ((root) => {

	const mount = (node) => {

		root.replaceChildren(node);

	};

	const element = (node, {

		attrs = {},

		className,

		children = [],

	} = {}) => {

		let el;

		switch (typeof node) {

			case 'function':

				el = node();

				break;

			case 'object':

				el = node;

				break;

			default:

				el = document.createElement(node);

		};

		if (className) {

			el.className = className;

		};

		for (const attrKey of Object.getOwnPropertyNames(attrs)) {

			el.setAttribute(attrKey, attrs[attrKey]);

		};

		for (const child of children) {

			switch (typeof child) {

				case 'string':

					el.insertAdjacentHTML('afterbegin', child);

					break;

				default:

					el.append(child);

					break;

			};

		};

		return el;

	};

	return {

		element,

		mount,

	};

})(document.getElementById('root'));

const Header = () => {

	return DOM.element('header', {

		children: ['<h1>User Archive</h1>'],

	});

};

const FirstSection = () => {

	return DOM.element('section', {

		children: [

			DOM.element('ul', {

				children: [

					DOM.element('li', {

						children: [

							DOM.element('span', {

								children: [

									`<a href="/">Home</a>`,

								],

							}),

						],

					}),

					DOM.element('li', {

						children: [

							DOM.element('span', {

								children: [

									`<a href="/about">About Page</a>`,

								],

							}),

						],

					}),

				],

			}),

		],

	});

};

const SecondSection = () => {

	return DOM.element('section', {

		children: [

			DOM.element('div', {

				children: [

					`<span>${userData.date()}</span>`

				],

			}),

		],

	});

};

const ThirdSection = () => {

	return DOM.element('section', {

		children: [

			DOM.element('div', {

				children: [

					DOM.element('ul', {

						children: [

							DOM.element('li', {

								children: [

									`User: <span>${userData.firstName()}</span> <span>${userData.lastName()}</span> - <span>${userData.age()}</span> years old;`

								],

							}),

						],

					}),

				],

			}),

		],

	});

};

const Main = () => {

	return DOM.element('main', {

		children: [

			DOM.element(FirstSection),

			DOM.element(SecondSection),

			DOM.element(ThirdSection),

		],

	});

};

const App = () => {

	return DOM.element(() => document.createDocumentFragment(), {

		children: [

			Header(),

			Main(),

		],

	});

};

DOM.mount(App());