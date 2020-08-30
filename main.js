let jukeBox = document.querySelector(".player");
let context = new AudioContext(); // Create and Initialize the Audio Context
let namesAndSounds = new Map();
let divs = new Map().set('div1', false).set('div4', false).set('div5', false);
let isFinished = false;

let elem = document.getElementById("myBar");
let width = 0;

let rebuttelsBar;

let bantersBar;

let loadMessage = document.getElementById("loadMessage");

let dataResponse;

let dataCall = new XMLHttpRequest();

window.addEventListener('DOMContentLoaded', (event) => {
	localStorage.clear();
	dataCall.open("GET", "./data.json", true);
	dataCall.send();
});

dataCall.onload = function () {
	dataResponse = JSON.parse(dataCall.response);
	setTemplate();
}

function setTemplate() {
	let buttonsHtml = "";
	$('#player')[0].innerHTML = "";
	for (key in dataResponse) {
		buttonsHtml = "";
		dataResponse[key].data.forEach(ele => {
			buttonsHtml += `<button class="${ele.class}" data-src="${ele.src}"><span class='key-icon'>${ele.key}</span>${ele.name}</button>`;
		})
		$('#player').append(`
		<div id="myProgress">
        <div id="${dataResponse[key].id}bar"></div>
    	</div>	
		<div class="main-card mb-3 card ${dataResponse[key]['is-target-div'] ? 'targetDiv' : ''} col-12" id="${dataResponse[key].id}"style="margin-bottom: 8px!important;width: 100%;display:${dataResponse[key].hidden ? 'none' : 'block'}">
		<div class="card-body">
		<h5 class="card-title">${key}</h5>
		<div style="display:flex;flex-wrap:wrap">
		${buttonsHtml}
		</div>
		</div>
		</div>`);
		let keys = divs.keys();
		loadSounds(keys.next().value);
		rebuttelsBar = document.getElementById("div4");
		bantersBar = document.getElementById("div5");
	}
}

function loadComponents() {
	for (key in dataResponse) {
		if (key == "qualifying-questions") {
			dataResponse[key].hidden = false;
			dataResponse["Intros"].hidden = true;
			dataResponse["closing"].hidden = true;
			break;
		}
		setTemplate();
	}
}

window.addEventListener('keydown', keyDown);

function keyDown(event) {
	let keys = Array.from(namesAndSounds.keys());
	let buttons = document.getElementsByTagName("button");
	for (let i = 0; i < keys.length; i++) {
		let j = keys[i].lastIndexOf('\\') + 1;
		if (keys[i][j] === event.key) {
			for(let k = 0;k<buttons.length;k++){
				if(keys[i] == buttons[k].getAttribute('data-src')){
					buttons[k].id = 'playing';
				}
			}
			return playNewSong(keys[i], namesAndSounds.get(keys[i]));
		}
	}

}

function loadSounds(id) {
	width = 0;
	elem.style.width = width + '%';
	let loadMessageMap = new Map().set('div1', 'loading INTROS...').set('div4', 'loading REBUTTELS...').set('div5', 'loading BANTERS...').set('div2', 'loading QUALIFYING QUESTIONS...').set('div3', 'loading CLOSINGS...');
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
			switch (id) {
				case 'div4':
					div4bar.style.width = (100 / length) * width + '%';
					break;
				case 'div5':
					div5bar.style.width = (100 / length) * width + '%';
					break;
				default:
					elem.style.width = (100 / length) * width + '%';
					break;
			}


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
				return loadSounds(key);
			}
		}
	}
}

jukeBox.addEventListener("click", function (event) {
	let songName = event.target.getAttribute("data-src");
	if (songName != undefined) {
		let electro = namesAndSounds.get(songName);
		if (localStorage.getItem('songName')) {
			let oldSongName = localStorage.getItem('songName');
			if (songName === oldSongName) {
				if (context.state === 'running') {
					context.suspend()
				} else if (context.state === 'suspended') {
					context.resume()
				}
				if (context.state == "closed") {
					playNewSong(songName, electro);
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
	}
});

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

function reset() {
	$('button').removeAttr('id');
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
