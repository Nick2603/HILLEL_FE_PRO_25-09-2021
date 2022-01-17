import { COOKIE } from './utils';

import './index.css';

const basicForm = document.forms.login;

const User = document.querySelector('section h2 span');

const checkbox = basicForm.remember

const userSection = document.getElementById('userSection');

if (COOKIE.hasCookie('email')) {

   basicForm.classList.add('hidden');

   userSection.classList.remove('hidden')

   User.innerText = `${COOKIE.getCookie('email')}`;

};

const state = {};

const validation = {

   email: (value) => value !== "admin@example.com",

   password: (value) => value !== "admin",

};

const errors = {

   email: true,

   password: true,

};

const handleEvent = (event) => {

   const {

      name,

      value,

   } = event.target;

   state[name] = value;

   errors[name] = name in validation ? validation[name](state[name], state) : false;

   event.currentTarget.submitBtn.disabled = Object.keys(errors).some(key => errors[key]);

};

const handleSubmit = (event) => {

   event.preventDefault();

   User.innerText = `${state.email}`;

   userSection.classList.remove('hidden');

   basicForm.classList.add('hidden');

   if (checkbox.checked) {

      COOKIE.setCookie('email', `${state.email}`, { 'max-age': 86400 });

   };

};

basicForm.addEventListener('change', handleEvent);

basicForm.addEventListener('submit', handleSubmit);