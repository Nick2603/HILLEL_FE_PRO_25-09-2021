const USER_DATA = {

	firstName: function () {

		const minFirstName = 5;

		const maxFirstName = 20;

		const validateFirstName = function (input) {

			return !isNaN(input) || input.trim().length < minFirstName || input.trim().length > maxFirstName;

		};

		let firstName = STDIN.getStringInput(`Put your first name: only letters, min: ${minFirstName}, max: ${maxFirstName}`, validateFirstName);

		return firstName;

	},

	lastName: function () {

		const minLastName = 5;

		const maxLastName = 20;

		const validateLastName = function (input) {

			return !isNaN(input) || input.trim().length < minLastName || input.trim().length > maxLastName;

		};

		let lastName = STDIN.getStringInput(`Put your last name: only letters, min: ${minLastName}, max: ${maxLastName}`, validateLastName);

		return lastName;

	},

	age: function () {

		const minYear = 1900;

		const validateYear = function (input) {

			return isNaN(input) || input < minYear || input > new Date().getFullYear();

		};

		let yearOfBirth = STDIN.getNumberInput(`Put your year of birth: only numbers, min: ${minYear}, max: ${new Date().getFullYear()}`, validateYear);

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

};

class Timestamp {

	toISOString() {

		return DATE.getDateByFormat('yyyy-mm-dd hh:mm:ss.MMM');

	}

	toString() {

		return DATE.getDateByFormat('yyyy Mon dd at hh:mm');

	}

};

class App {

	constructor() {

		this.list = document.querySelector('.list');

		this.timestamp = document.querySelector('.timestamp');

	}

	render() {

		for (const li of this.list.children) {

			li.classList.add('list__item--ready');

			for (const element of li.children) {

				const dataField = element.dataset.field;

				if (dataField in USER_DATA) {

					element.textContent = USER_DATA[dataField]();

				};

			};

		};

		this.update();

	}

	update() {

		let newTimestamp = new Timestamp;

		const time = this.timestamp;

		time.textContent = newTimestamp.toString();

		time.setAttribute('datetime', newTimestamp.toISOString());

	}

};

let renderNow = new App;

renderNow.render();