let jukeBox = document.querySelector(".player");
let context = new AudioContext(); // Create and Initialize the Audio Context
let namesAndSounds = new Map();
let divs = new Map().set('div1', false).set('div4', false).set('div5', false);
let isFinished = false;

let elem = document.getElementById("myBar");
let width = 0;

let loadMessage = document.getElementById("loadMessage");

window.addEventListener('DOMContentLoaded', (event) => {
	let keys = divs.keys();
	loadSounds(keys.next().value);
	localStorage.clear();
});

window.addEventListener('keydown',keyDown);

function keyDown(event){
	let keys = Array.from(namesAndSounds.keys());
	for(let i=0;i < keys.length;i++){
		let j = keys[i].lastIndexOf('\\')+1;
		if(keys[i][j] === event.key){
			return playNewSong(keys[i],namesAndSounds.get(keys[i]));
		}
	}
}

function loadSounds(id) {
	width = 0;
	elem.style.width = width + '%';
	let loadMessageMap = new Map().set('div1','loading INTROS...').set('div4','loading REBUTTELS...').set('div5','loading BANTERS...').set('div2','loading QUALIFYING QUESTIONS...').set('div3','loading CLOSINGS...');
	loadMessage.innerHTML = loadMessageMap.get(id);
	let btnElement = document.getElementById(id);
	let buttons = btnElement.getElementsByTagName("button");
	if (buttons.length) {
		for (let i = 0; i < buttons.length; i++) {
			setAudioToButton(buttons[i], buttons.length, id);
		}
	}
	localStorage.clear();
}

function setAudioToButton(element, length, id) {
	var context = new AudioContext();
	let getSound = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
	getSound.open("GET", "./" + element.dataset.src, true); // Path to Audio File
	getSound.responseType = "arraybuffer"; // Read as Binary Data
	getSound.onload = function () {
		context.decodeAudioData(getSound.response, function (buffer) {
			width++;
			namesAndSounds.set(element.dataset.src, buffer);
			elem.style.width = (100 / length) * width + '%';
			if (length === width) {
				doRecursion(id);
				loadMessage.innerHTML = '';
			}
		});
	}
	getSound.send();
}

function doRecursion(id) {
	if (!divs.get(id)) {
		divs.set(id, true);
		let keys = Array.from(divs.keys());
		for (let key of keys) {
			if (!divs.get(key)) {
				width = 0;
				elem.style.width = width + '%';
				return loadSounds(key);
			}
		}
	}
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
	isFinished = false;
	context = new AudioContext();
	let playSound = context.createBufferSource();
	playSound.buffer = electro;
	playSound.connect(context.destination);
	playSound.start(0);
	event.target.id = 'playing';
	localStorage.setItem('songName', songName);
	playSound.onended = onEnded;
}

function stopAll() {
	context.close();
}

function onEnded() {
	isFinished = true;
	console.log('playback finished');
}

function reset(){
	$('button').removeClass('selected');
	stopAll();
}

$('button').on('click', function () {
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

$('document').on('keydown', function () {
	if (e.keyCode == 88) {
		alert($(this).val());
	}
});
