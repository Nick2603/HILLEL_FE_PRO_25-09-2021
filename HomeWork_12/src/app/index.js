class Account {

	constructor(firstName, lastName, email, password) {

		this.firstName = firstName;

		this.lastName = lastName;

		this.email = email;

		this.password = password;

	};

	get fullName() {

		return `${this.firstName} ${this.lastName}`;

	};

	set fullName(value) {

		const firstName = value.split(' ')[0];

		const lastName = value.split(' ')[1];

		if (firstName) {

			this.firstName = firstName;

		};

		if (lastName) {

			this.lastName = lastName;

		};

	};

};

class GuestAccount extends Account {

	type = 'Guest';

	permissions = ['READ'];

};

class AdminAccount extends Account {

	type = 'Admin';

	permissions = ['WRITE', 'READ'];

};

const AUTHENTICATION = (function () {

	const minFirstName = 1;

	const maxFirstName = 20;

	const minLastName = 1;

	const maxLastName = 30;

	const accountArchive = archiveFabric();

	accountArchive.add(new AdminAccount('Nikita', 'Vostrikov', 'Nikita@gmail.com', '0123456789'));

	return {

		signIn() {

			const validateEmail = function (input) {

				return !input.includes('@');

			};

			const email = STDIN.getStringInput('Enter your email address, please', validateEmail);

			const validatePassword = function (input) {

				return input.trim().length < 5;

			};

			const password = STDIN.getStringInput('Enter your password, please, min: 5 letters', validatePassword);

			const searchAccount = accountArchive.find((el) => el.email === email && el.password === password);

			if (searchAccount) {

				return searchAccount;

			} else {

				console.log('Account is not found');

				const toRetry = confirm("Do you want to retry?");

				if (toRetry) {

					this.signIn();

				} else {

					const toSignUp = confirm("Do you want to sign up?");

					if (toSignUp) {

						return this.signUp();

					};

				};

			};

		},

		signUp() {

			const validateFirstName = function (input) {

				return !isNaN(input) || input.trim().length < minFirstName || input.trim().length > maxFirstName;

			};

			let firstName = STDIN.getStringInput(`Put your first name: only letters, min: ${minFirstName}, max: ${maxFirstName}`, validateFirstName);

			const validateLastName = function (input) {

				return !isNaN(input) || input.trim().length < minLastName || input.trim().length > maxLastName;

			};

			let lastName = STDIN.getStringInput(`Put your last name: only letters, min: ${minLastName}, max: ${maxLastName}`, validateLastName);


			const validateEmail = function (input) {

				return !input.includes('@');

			};

			const email = STDIN.getStringInput('Enter your email address, please', validateEmail);

			const validatePassword = function (input) {

				return input.trim().length < 5;

			};

			const password = STDIN.getStringInput('Enter your password, please, min: 5 letters', validatePassword);

			const guest = new GuestAccount(firstName, lastName, email, password);

			accountArchive.add(guest);

			return guest;

		},

	};

})();

const APPLICATION = (function () {

	const ALLOWED_OPERATIONS = [

		['Stop Program', 'stopProgram'],

		['Add User: for admin only', 'addUser'],

		['Delete User: for admin only', 'deleteUser'],

		['Show All Users', 'showUsers'],

		['Show All Users Average Age', 'averageAge'],

		['Show User By Last Name', 'showUserByName'],

		['Show Users Younger Than...', 'showFilteredUsers'],

	];

	const alloweds = function (item, i) {

		return (`${i}: ${item[0]}`).toString()

	};

	const message = ALLOWED_OPERATIONS.map(alloweds);

	const minYear = 1900;

	const minMonth = 1;

	const maxMonth = 12;

	const minDay = 1;

	const minFirstName = 1;

	const maxFirstName = 20;

	const minLastName = 1;

	const maxLastName = 30;

	const userArchive = archiveFabric();

	return {

		account: null,

		run() {

			this.account = AUTHENTICATION.signIn();

			do {

				console.clear();

				const OpIndex = this.getOperation();

				this.doOperation(OpIndex);

			} while (confirm('Do you want to do another operation?'));

			console.log('Bye bye, see you later.');

		},
		doOperation(index) {

			const [, methodName] = ALLOWED_OPERATIONS[index];

			if (Object.keys(this).includes(methodName)) {

				this[methodName]();

			} else {

				console.log('Method does not exist, please double-check.');

			};

		},

		getOperation() {

			const availables = Object.keys(ALLOWED_OPERATIONS).map(Number);

			const validateOpIndex = (input) => {

				return !availables.includes(input);

			};

			return STDIN.getNumberInput(`Enter operation: ${message}`, validateOpIndex);

		},

		stopProgram() {

			if (userArchive.isEmpty()) {

				console.log('No users in archive');

			} else {

				console.log(`There are ${userArchive.count()} more users in the archive.`);

			};

		},

		addUser() {

			if (this.account.type === 'Admin') {

				do {

					const validateYear = function (input) {

						return isNaN(input) || input < minYear || input > new Date().getFullYear();

					};

					let yearOfBirth = STDIN.getNumberInput(`Put your year of birth: only numbers, min: ${minYear}, max: ${new Date().getFullYear()}`, validateYear);

					const validateMonth = function (input) {

						return isNaN(input) || input < minMonth || input > maxMonth;

					};

					let monthOfBirth = STDIN.getNumberInput(`Put your month of birth: only numbers, min: ${minMonth}, max: ${maxMonth}`, validateMonth);

					let maxDay = DATE.doMaxDay(monthOfBirth, yearOfBirth);

					const validateDay = function (maxDay) {

						return function (input) {

							return isNaN(input) || input < minDay || input > maxDay;

						};

					};

					let dayOfBirth = STDIN.getNumberInput(`Put your day of birth: only numbers, min: ${minDay}, max: ${maxDay}`, validateDay(maxDay));

					const validateFirstName = function (input) {

						return !isNaN(input) || input.trim().length < minFirstName || input.trim().length > maxFirstName;

					};

					let firstName = STDIN.getStringInput(`Put your first name: only letters, min: ${minFirstName}, max: ${maxFirstName}`, validateFirstName);

					const validateLastName = function (input) {

						return !isNaN(input) || input.trim().length < minLastName || input.trim().length > maxLastName;

					};

					let lastName = STDIN.getStringInput(`Put your last name: only letters, min: ${minLastName}, max: ${maxLastName}`, validateLastName);

					let astrologicalSign = DATE.doAstrologicalSign(monthOfBirth, dayOfBirth);

					const user = userFabric(firstName, lastName, yearOfBirth, monthOfBirth, dayOfBirth, astrologicalSign);

					console.log(`User Bio: ${firstName} ${lastName}, ${user.age} ${DATE.isLeapYear(yearOfBirth) ? 'years old (is leap year)' : 'years old'}, ${astrologicalSign};`);

					userArchive.add(user);

				} while (confirm("Do you want to put data for one more user?"));

			} else {

				console.log('No permission!');

			};

		},

		deleteUser() {

			if (this.account.type === 'Admin') {

				if (!userArchive.isEmpty()) {

					const validateIndexToDelete = function (input) {

						return isNaN(input) || input < 0 || input > userArchive.count() - 1;

					};

					let indexToDelete = STDIN.getNumberInput(`Enter index of the user to delete, min: 0, max: ${userArchive.count() - 1}`, validateIndexToDelete);

					let removed = userArchive.delete(indexToDelete);

					console.log(`User: ${removed[0].firstName} ${removed[0].lastName} deleted successfully.`);

					console.log(`There are ${userArchive.count()} more users in the archive.`);

				} else {

					console.log('The archive is empty.');

				};

			} else {

				console.log('No permission!');

			};

		},

		showUsers() {

			if (!userArchive.isEmpty()) {

				const showUserData = function (user, i) {

					console.log(`User [${i}]: ${user.firstName} ${user.lastName}, ${user.age} ${DATE.isLeapYear(user.yearOfBirth) ? 'years old (is leap year)' : 'years old'}, ${user.astrologicalSign};`);

				};

				userArchive.each(showUserData);

			} else {

				console.log('The archive is empty.');

			};

		},

		averageAge() {

			if (!userArchive.isEmpty()) {

				let getAverageAge = userArchive.reduce((prev, user) => prev + user.age) / userArchive.count();

				let getAverageAgeResult = Math.round(getAverageAge * 100) / 100;

				console.log(`All users average age is ${getAverageAgeResult} years`);

			} else {

				console.log('The archive is empty.');

			};

		},

		showUserByName() {

			if (!userArchive.isEmpty()) {

				const validateLastName = function (input) {

					return !isNaN(input) || input.trim().length < minLastName || input.trim().length > maxLastName;

				};

				let userLastName = STDIN.getStringInput(`Put last name of the user to find, min: ${minLastName}, max: ${maxLastName}`, validateLastName);

				function getUsersFilteredByLN(user) {

					return user.lastName === userLastName;

				};

				const usersFilteredByLNResult = userArchive.filter(getUsersFilteredByLN);

				if (usersFilteredByLNResult.length > 0) {

					const showFilteredUsersLN = function (user) {

						console.log(`Here is the user you've been looking for: ${user.firstName} ${user.lastName}, ${user.age} ${DATE.isLeapYear(user.yearOfBirth) ? 'years old (is leap year)' : 'years old'}`);

					};

					usersFilteredByLNResult.forEach(showFilteredUsersLN);

				} else {

					console.log('No user found');

				};

			} else {

				console.log('The archive is empty.');

			};

		},

		showFilteredUsers() {

			if (!userArchive.isEmpty()) {

				const validateYear = function (input) {

					return isNaN(input) || input < minYear || input > new Date().getFullYear();

				};

				let maxYear = STDIN.getNumberInput(`Enter max birth year of a user, min: ${minYear}, max: ${new Date().getFullYear()}`, validateYear);

				function getFilteredUsers(user) {

					return user.yearOfBirth <= maxYear;

				};

				const FilteredUsersResult = userArchive.filter(getFilteredUsers);

				if (FilteredUsersResult.length > 0) {

					const showFilteredUsersFirstName = function (user) {

						console.log(`${user.firstName} was born in ${user.yearOfBirth}`);

					};

					FilteredUsersResult.forEach(showFilteredUsersFirstName);

				} else {

					console.log('No users found');

				};

			} else {

				console.log('The archive is empty.');

			};

		},

	};

})();

APPLICATION.run();