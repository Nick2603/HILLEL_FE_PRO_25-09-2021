const basicForm = document.forms.signUp;

const output = document.getElementById('output');

const state = {};

const validation = {

	email: (value) => !value.includes('@'),

	password: (value, rest) => value.length < 9 || value.length > 24 || rest.email === value,

	passwordConfirm: (value, rest) => rest.password !== value,

	consent: (checked) => !checked,

};

const errors = {

	email: true,

	password: true,

	passwordConfirm: true,

	consent: true,

};

const handleEvent = (event) => {

	const {

		type,

		name,

		value,

		checked,

	} = event.target;


	switch (type) {

		case 'checkbox':

			state[name] = checked;

			break;

		default:

			state[name] = value;

			break;

	};

	errors[name] = name in validation ? validation[name](state[name], state) : false;

	event.currentTarget.submitBtn.disabled = Object.keys(errors).some(key => errors[key]);

};

const handleSubmit = (event) => {

	event.preventDefault();

	let nodes = [];

	const email = document.createElement('p');

	email.innerText = `email: <${state.email}>`

	const password = document.createElement('p');

	password.innerText = `password: <${state.password}>`

	nodes.push(email, password)

	output.replaceChildren(...nodes);

};

basicForm.addEventListener('change', handleEvent);

basicForm.addEventListener('submit', handleSubmit);