const STDIN = (function () {

	const getNumberInput = function (message, validate) {

		let input;

		do {

			input = parseInt(prompt(message, ''));

		} while (validate(input));

		return input;

	};

	const getStringInput = function (message, validate) {

		let input;

		do {

			input = prompt(message ?? "", '');

		} while (validate(input));

		return input;

	};

	return {

		getNumberInput,

		getStringInput,

	};

})();

const DATE = (function () {

	const isLeapYear = function (year) {

		let leapYear;

		let moduleOF400 = year % 400 === 0;

		let moduleOF100 = year % 100 === 0;

		let moduleOF4 = year % 4 === 0;

		if ((moduleOF400 || (!moduleOF100 && moduleOF4))) {

			leapYear = true;

		} else {

			leapYear = false;

		};

		return leapYear;

	};

	const doMaxDay = function (month, year) {

		let maxDay;

		if (month === 1) {
			maxDay = 31;
		} else if (month === 2) {
			maxDay = isLeapYear(year) ? 29 : 28;
		} else if (month === 3) {
			maxDay = 31;
		} else if (month === 4) {
			maxDay = 30;
		} else if (month === 5) {
			maxDay = 31;
		} else if (month === 6) {
			maxDay = 30;
		} else if (month === 7) {
			maxDay = 31;
		} else if (month === 8) {
			maxDay = 31;
		} else if (month === 9) {
			maxDay = 30;
		} else if (month === 10) {
			maxDay = 31;
		} else if (month === 11) {
			maxDay = 30;
		} else {
			maxDay = 31;
		};

		return maxDay;

	};

	const getDateByFormat = function (format) {

		switch (format) {

			case 'dd/mm/yyyy hh:mm':

				let dd = new Date().getDate();

				if (dd < 10) {

					dd = '0' + dd

				};

				let mm = new Date().getMonth() + 1;

				if (mm < 10) {

					mm = '0' + mm

				};

				let hh = new Date().getHours();

				if (hh < 10) {

					hh = '0' + hh

				};

				let min = new Date().getMinutes();

				if (min < 10) {

					min = '0' + min

				};

				return `${dd}/${mm}/${new Date().getFullYear()} ${hh}:${min}`;

			default:

				return new Date().toDateString();
		};

	};

	return {

		isLeapYear,

		doMaxDay,

		getDateByFormat,

	};

})();

const functions = {

	firstName: function () {

		const minName = 5;

		const maxName = 20;

		const validateName = function (input) {

			return !isNaN(input) || input.trim().length < minName || input.trim().length > maxName;

		};

		let firstName = STDIN.getStringInput(`Put your first name: only letters, min: ${minName}, max: ${maxName}`, validateName);

		return firstName;

	},

	lastName: function () {

		const minName = 5;

		const maxName = 20;

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

const spans = document.body.querySelectorAll('span');

for (const span of spans) {

	const text = span.innerHTML;

	if (text in functions) {

		span.textContent = functions[text]();

	};

};