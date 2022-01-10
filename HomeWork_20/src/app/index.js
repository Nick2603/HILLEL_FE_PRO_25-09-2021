let timer = null

let timerRun = false;

let clock = document.getElementsByName('clock')[0];

let inputs = clock.querySelectorAll('input');

inputs[1].focus();

let moveFocus = function (elem) {

	if (elem.value.length == 2) {

		if (elem.nextElementSibling) {

			elem.nextElementSibling.focus();

		} else {

			elem.blur();

		};

	};

};

for (let i = 1; i < inputs.length; i++) {

	inputs[i].addEventListener('keyup', () => moveFocus(inputs[i]));

};

let stopTime = function () {

	if (timerRun) {

		clearTimeout(timer);

		timerRun = false;

	};

};

let startTime = function () {

	stopTime();

	showTime();

};

let showTime = function () {

	let time = new Date();

	let year = time.getFullYear();

	let month = time.getMonth();

	let day = time.getDate();

	let hours = time.getHours();

	let minutes = time.getMinutes();

	let seconds = time.getSeconds();

	let datavalue = " " + day + ".";

	datavalue += (month + 1) + ".";

	datavalue += year;

	let timevalue = datavalue + " " + hours;

	timevalue += ((minutes < 10) ? " :0" : " : ") + minutes;

	timevalue += ((seconds < 10) ? " :0" : " : ") + seconds;

	document.clock.next.value = timevalue;

	if (document.clock.next1.value == hours && document.clock.next2.value == minutes && document.clock.next3.value == seconds) {

		alert("ALARM");

	};

	timer = setTimeout('showTime()', 1000);

	timerRun = true;

};

document.body.onload = startTime();