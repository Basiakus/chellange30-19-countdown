let countdown;
const displayTimeLeft = document.querySelector('.display__time-left'); 
const displayTimeToEnd = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const form = document.querySelector('#custom');

function timer(sec) {
	clearInterval(countdown);
	const date = Date.now();
	const userTime = date + sec * 1000;
	displayCountdown(sec);
	displayEndTime(userTime);

	countdown = setInterval(function() {
		secLeft = Math.round((userTime - Date.now()) / 1000);
		if (secLeft < 0) {
			clearInterval(countdown);
			return;
		}
		displayCountdown(secLeft);
	}, 1000);
}


function displayCountdown(sec) {
	const minutes = Math.floor(sec / 60);
	const seconds = Math.floor(sec % 60);
	let display = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	displayTimeLeft.textContent = display;
	document.title = display;
	//console.log({minutes, seconds});
}
function displayEndTime(userTime) {
	const endTime = new Date(userTime);
	const hours = endTime.getHours();
	const minutes = endTime.getMinutes();
	displayTimeToEnd.textContent = `I will come back at ${hours < 10 ? '0': ''}${hours}:${minutes < 10 ? '0': ''}${minutes}`;
}
function choiceTime() {
	const choice = parseInt(this.dataset.time);
	timer(choice);
}
function customValue(e) {
	e.preventDefault();
	const customValue = form.minutes.value;
	(!isNaN( customValue )) ? timer(customValue) : displayTimeToEnd.textContent = 'Please Write The Number';
	form.reset();
}
buttons.forEach( button => button.addEventListener('click', choiceTime));
form.addEventListener('submit', customValue);