let jukeBox = document.querySelector(".player");
let context = new AudioContext(); // Create and Initialize the Audio Context
let namesAndSounds = new Map();

window.addEventListener('DOMContentLoaded', (event) => {
	let intro = document.getElementById('div1');
	let buttons = intro.getElementsByClassName('button');
	for (let i = 0; i < buttons.length; i++) {
		setAudioToButton(buttons[i]);
	}
	localStorage.clear();
});


(function () {
	window.addEventListener("keydown", onKeyDown); // Create Event Listener for KeyDown
	function onKeyDown(e){
		switch (e.keyCode) {
			// X
			case 88:
				var playSound = context.createBufferSource(); // Declare a New Sound
				playSound.buffer = electro; // Attatch our Audio Data as it's Buffer
				playSound.connect(context.destination);  // Link the Sound to the Output
				playSound.start(0); // Play the Sound Immediately
			break;
		}
 	}
}());

function stopAll(){
	context.close();
}

function loadSounds(id) {
	let intro = document.getElementById(id);
	let buttons = intro.getElementsByClassName('button');
	if (buttons.length) {
		for (let i = 0; i < buttons.length; i++) {
			setAudioToButton(buttons[i]);
		}
	}
	else {
		buttons = intro.getElementsByClassName('buttonrebtl');
	}

	if (buttons.length) {
		for (let i = 0; i < buttons.length; i++) {
			setAudioToButton(buttons[i]);
		}
	}
	else {
		buttons = intro.getElementsByClassName('buttonbntr');
	}

	if (buttons.length) {
		for (let i = 0; i < buttons.length; i++) {
			setAudioToButton(buttons[i]);
		}
	}
	else {
		return;
	}
	localStorage.clear();
}

function setAudioToButton(element) {
	var context = new AudioContext();
	let getSound = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
	getSound.open("GET", "./" + element.dataset.src, true); // Path to Audio File
	getSound.responseType = "arraybuffer"; // Read as Binary Data
	getSound.onload = function () {
		context.decodeAudioData(getSound.response, function (buffer) {
			namesAndSounds.set(element.dataset.src,buffer);
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
		}
		else {
			playNewSong(songName,electro)
		}
	}
	else {
		playNewSong(songName,electro);
	}
})

function playNewSong(songName,electro){
	if (context.state === 'running' || context.state === 'suspended') {
		context.close();
	}
	context = new AudioContext();
	let playSound = context.createBufferSource(); // Declare a New Sound
	playSound.buffer = electro; // Attatch our Audio Data as it's Buffer
	playSound.connect(context.destination);  // Link the Sound to the Output
	playSound.start(0); // Play the Sound Immediately
	event.target.id = 'playing';
	localStorage.setItem('songName', songName);
}

$('button').on('click', function(){
    $('button').removeClass('selected');
    $(this).addClass('selected');
});
jQuery(function(){
        
        jQuery('.showSingle').click(function(){
              jQuery('.targetDiv').hide();
              jQuery('#div'+$(this).attr('target')).show();
        });
});$('li > a').click(function() {
    $('li').removeClass();
    $(this).parent().addClass('mm-active');
});


