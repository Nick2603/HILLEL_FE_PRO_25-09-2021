function getRandomIntInclusive(min, max) {

	min = Math.ceil(min);

	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min + 1) + min);

};

const randomizeError = () => {

	const random = getRandomIntInclusive(1, 100);

	if (random > 90) {

		return new Error('Bad Request');

	};

	return null;

};


//////////////////// Колбеки ////////////////////


/*
const getUsers = (callback) => {

	const USERS = [

		{ id: 1, name: 'Bob' },

		{ id: 2, name: 'Andy' },

		{ id: 3, name: 'John' },

	];

	setTimeout(() => {

		callback(randomizeError(), USERS);

	}, 2000);

};

const getProducts = (callback) => {

	const PRODUCTS = [

		{ id: 1, name: 'iPad' },

		{ id: 2, name: 'Google Pixel' },

		{ id: 3, name: 'War and Peace' },

		{ id: 4, name: 'iPad' },

		{ id: 5, name: 'Kaizen' },

		{ id: 6, name: 'Sherlock Holmes' },

	];

	setTimeout(() => {

		callback(randomizeError(), PRODUCTS);

	}, 2000);

};

const getOrders = (callback) => {

	const ORDERS = [

		{ id: 1, userId: 1, checkout: [1, 6] },

		{ id: 2, userId: 1, checkout: [3] },

		{ id: 3, userId: 2, checkout: [2, 6] },

	];

	setTimeout(() => {

		callback(randomizeError(), ORDERS);

	}, 2000);

};

const getCheckoutsForUser = (userId, cb) => {

	getUsers((err, users) => {

		if (err) {

			cb(err);

			return;

		};

		const user = users.find((user) => user.id === userId);

		if (!user) {

			cb(new Error('User is not found'));

			return;

		};

		getOrders((err, orders) => {

			if (err) {

				cb(err);

				return;

			};

			const userOders = orders.filter((order) => order.userId === user.id);

			if (userOders.length == 0) {

				cb(new Error('User has not added any orders yet'));

				return;

			};

			getProducts((err, products) => {

				if (err) {

					cb(err);

					return;

				};

				for (const iterator of userOders) {

					iterator.checkout = iterator.checkout.map(productId => products.find(pr => pr.id === productId))

				};

				for (const iterator of userOders) {

					for (const value of Object.values(iterator)) {

						if (Array.isArray(value)) {

							if (value.includes(undefined)) {

								cb(new Error("Not able to find user's products"));

								return;
							};

						};

					};

				};

				cb(null, userOders);

			});

		});

	});

};

getCheckoutsForUser(1, (err, value) => {

	if (err) {

		console.error(err);

	} else {

		console.log(value);

	};

});
*/


// ////////////////// Промисы ////////////////////


/*
const getUsers = () => {

	const USERS = [

		{ id: 1, name: 'Bob' },

		{ id: 2, name: 'Andy' },

		{ id: 3, name: 'John' },

	];

	const err = randomizeError();

	return new Promise((resolve, reject) => {

		setTimeout(() => {

			if (err) {

				reject(err);

			};

			resolve(USERS);

		}, 2000);

	});

};

const getProducts = () => {

	const PRODUCTS = [

		{ id: 1, name: 'iPad' },

		{ id: 2, name: 'Google Pixel' },

		{ id: 3, name: 'War and Peace' },

		{ id: 4, name: 'iPad' },

		{ id: 5, name: 'Kaizen' },

		{ id: 6, name: 'Sherlock Holmes' },

	];

	const err = randomizeError();

	return new Promise((resolve, reject) => {

		setTimeout(() => {

			if (err) {

				reject(err);

			};

			resolve(PRODUCTS);

		}, 2000);

	});

};

const getOrders = () => {

	const ORDERS = [

		{ id: 1, userId: 1, checkout: [1, 6] },

		{ id: 2, userId: 1, checkout: [3] },

		{ id: 3, userId: 2, checkout: [2, 6] },

	];

	const err = randomizeError();

	return new Promise((resolve, reject) => {

		setTimeout(() => {

			if (err) {

				reject(err);

			};

			resolve(ORDERS);

		}, 2000);

	});

};

const getCheckoutsForUserAsPromise = (userId) => {

	getUsers()
		.then(users => {

			const user = users.find((user) => user.id === userId);

			if (!user) {

				throw new Error('User is not found');

			};

			return user;

		})
		.then(user => {

			return getOrders();

		})
		.then(orders => {

			const userOders = orders.filter((order) => order.userId === userId);

			if (userOders.length == 0) {

				throw new Error('User has not added any orders yet');

			};

			return userOders;

		})
		.then(userOders => {

			return getProducts().then(products => {

				for (const iterator of userOders) {

					iterator.checkout = iterator.checkout.map(productId => products.find(pr => pr.id === productId))

				};

				for (const iterator of userOders) {

					for (const value of Object.values(iterator)) {

						if (Array.isArray(value)) {

							if (value.includes(undefined)) {

								throw new Error("Not able to find user's products");
							};

						};

					};

				};

				return userOders;

			});
		})
		.then(console.log)
		.catch(console.error);

};

getCheckoutsForUserAsPromise(2);
*/


//////////////////// Async/await ////////////////////



const getUsers = () => {

	const USERS = [

		{ id: 1, name: 'Bob' },

		{ id: 2, name: 'Andy' },

		{ id: 3, name: 'John' },

	];

	const err = randomizeError();

	return new Promise((resolve, reject) => {

		setTimeout(() => {

			if (err) {

				reject(err);

			};

			resolve(USERS);

		}, 2000);

	});

};

const getProducts = () => {

	const PRODUCTS = [

		{ id: 1, name: 'iPad' },

		{ id: 2, name: 'Google Pixel' },

		{ id: 3, name: 'War and Peace' },

		{ id: 4, name: 'iPad' },

		{ id: 5, name: 'Kaizen' },

		{ id: 6, name: 'Sherlock Holmes' },

	];

	const err = randomizeError();

	return new Promise((resolve, reject) => {

		setTimeout(() => {

			if (err) {

				reject(err);

			};

			resolve(PRODUCTS);

		}, 2000);

	});

};

const getOrders = () => {

	const ORDERS = [

		{ id: 1, userId: 1, checkout: [1, 6] },

		{ id: 2, userId: 1, checkout: [3] },

		{ id: 3, userId: 2, checkout: [2, 4] },

	];

	const err = randomizeError();

	return new Promise((resolve, reject) => {

		setTimeout(() => {

			if (err) {

				reject(err);

			};

			resolve(ORDERS);

		}, 2000);

	});

};

const getCheckoutsForUserAsPseudoSync = async (userId) => {

	try {

		const users = await getUsers();

		const user = users.find((user) => user.id === userId);

		if (!user) {

			throw new Error('User is not found');

		};

		const orders = await getOrders();

		const userOders = orders.filter((order) => order.userId === userId);

		if (userOders.length == 0) {

			throw new Error('User has not added any orders yet');

		};

		const products = await getProducts();

		for (const iterator of userOders) {

			iterator.checkout = iterator.checkout.map(productId => products.find(pr => pr.id === productId))

		};

		for (const iterator of userOders) {

			for (const value of Object.values(iterator)) {

				if (Array.isArray(value)) {

					if (value.includes(undefined)) {

						throw new Error("Not able to find user's products");
					};

				};

			};

		};

		console.log(userOders);

	} catch (error) {

		console.error(error);

	};

};

getCheckoutsForUserAsPseudoSync(1);
