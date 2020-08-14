let jukeBox = document.querySelector(".player");
let context = new AudioContext(); // Create and Initialize the Audio Context
let namesAndSounds = new Map();
let divs = ['div1', 'div4', 'div5'];
let isFinished = false;

window.addEventListener('DOMContentLoaded', (event) => {
	divs.forEach(ele => {
		loadSounds(ele);
	})
	localStorage.clear();
});


(function () {
	window.addEventListener("keydown", onKeyDown); // Create Event Listener for KeyDown
	function onKeyDown(e) {
		switch (e.keyCode) {
			// X
			case 88:
				console.log("dsfdsf");
				break;
		}
	}
}());

function stopAll() {
	context.close();
}
let elem = document.getElementById("myBar");
let width = 0;
function loadSounds(id) {
	let btnElement = document.getElementById(id);
	let buttons = btnElement.getElementsByTagName("button");
	if (buttons.length) {
		for (let i = 0; i < buttons.length; i++) {
			setAudioToButton(buttons[i], buttons.length);
		}
	}
	localStorage.clear();
}

function setAudioToButton(element, length) {
	var context = new AudioContext();
	let getSound = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
	getSound.open("GET", "./" + element.dataset.src, true); // Path to Audio File
	getSound.responseType = "arraybuffer"; // Read as Binary Data
	getSound.onload = function () {
		context.decodeAudioData(getSound.response, function (buffer) {
			namesAndSounds.set(element.dataset.src, buffer);
			elem.style.width = (100 / length) * 84 + '%';
		});
	}
	getSound.send();
}

jukeBox.addEventListener("click", function (event) {
	let songName = event.target.getAttribute("data-src");
	let electro = namesAndSounds.get(songName);
	if (localStorage.getItem('songName')) {
		let oldSongName = localStorage.getItem('songName');
		if (songName === oldSongName) {
			if (context.state === 'running') {
				context.suspend()
			} else if (context.state === 'suspended') {
				context.resume()
			}
			localStorage.setItem('songName', songName);
			if (isFinished) {
				playNewSong(songName, electro);
			}
		}
		else {
			playNewSong(songName, electro)
		}
	}
	else {
		playNewSong(songName, electro);
	}
})

function playNewSong(songName, electro) {
	if (context.state === 'running' || context.state === 'suspended') {
		context.close();
	}
	context = new AudioContext();
	let playSound = context.createBufferSource();
	playSound.buffer = electro; 
	playSound.connect(context.destination); 
	playSound.start(0);
	event.target.id = 'playing';
	localStorage.setItem('songName', songName);
	playSound.onended = onEnded;
}

function onEnded() {
	isFinished = true;
	console.log('playback finished');
}

$('button').on('click', function () {
	$('button').removeClass('selected');
	$(this).addClass('selected');
});
jQuery(function () {

	jQuery('.showSingle').click(function () {
		jQuery('.targetDiv').hide();
		jQuery('#div' + $(this).attr('target')).show();
	});
}); $('li > a').click(function () {
	$('li').removeClass();
	$(this).parent().addClass('mm-active');
});


