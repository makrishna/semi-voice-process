// var jukeBox=document.querySelector(".player")
// jukeBox.addEventListener("click",function (event){
// 	var songName=event.target.getAttribute("data-src")
// 	var audioPlayer=document.querySelector("#player");
// 	var audioFile = new Audio(songName);
// 	audioFile.preload;
// 	if(audioPlayer){

// 		var context = new AudioContext(); // Create and Initialize the Audio Context
// 		var electro; // Create the Sound 
// 		var getSound = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
// 		getSound.open("GET", "./"+songName, true); // Path to Audio File
// 		getSound.responseType = "arraybuffer"; // Read as Binary Data
// 		getSound.onload = function () {
// 			context.decodeAudioData(getSound.response, function (buffer) {
// 				electro = buffer; // Decode the Audio Data and Store it in a Variable
// 				var playSound = context.createBufferSource(); // Declare a New Sound
// 				playSound.buffer = electro; // Attatch our Audio Data as it's Buffer
// 				playSound.connect(context.destination);  // Link the Sound to the Output
// 				playSound.start(0); // Play the Sound Immediately
// 			});
// 		}
// 		getSound.send();



// 		// if (songName === audioPlayer.getAttribute("src")) {
// 		// 	if (audioPlayer.paused) {
// 		// 		audioFile.play();
// 		// 		event.target.id = "playing"
// 		// 	} else {
// 		// 		audioFile.pause()
// 		// 		event.target.id = "paused"
// 		// 	}
// 		// }
// 		// else {
// 		// 	audioPlayer.src = songName;
// 		// 	audioFile.play()
// 		// 	if (document.querySelector('#playing')) {
// 		// 		document.querySelector('#playing').id = '';
// 		// 	}
// 		// 	else {
// 		// 		document.querySelector('#paused').id = '';

// 		// 	}
// 		// 	event.target.id = 'playing';

// 		// }
// 	}
// 	else{
// 		var audioPlayer=document.createElement("audio");
// 		audioPlayer.id="player";
// 		document.body.appendChild(audioPlayer);
// 		audioPlayer.src=songName;
// 		audioFile.play()
// 		event.target.id = 'playing';
// 	}
// })

// $('button').on('click', function(){
//     $('button').removeClass('selected');
//     $(this).addClass('selected');
// });
// jQuery(function(){
        
//         jQuery('.showSingle').click(function(){
//               jQuery('.targetDiv').hide();
//               jQuery('#div'+$(this).attr('target')).show();
//         });
// });$('li > a').click(function() {
//     $('li').removeClass();
//     $(this).parent().addClass('mm-active');
//});

window.addEventListener('DOMContentLoaded', (event) => {
	let intro = document.getElementById('intro');
	console.log(intro);
	let buttons = intro.getElementsByClassName('button');
	for(let i=0;i<buttons.length;i++){
		setAudioToButton(buttons[i]);
	}
});

let namesAndSounds = [];

function setAudioToButton(element) {
	let context = new AudioContext(); // Create and Initialize the Audio Context
	let electro; // Create the Sound 
	let getSound = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
	getSound.open("GET", "./" + element.dataset.src, true); // Path to Audio File
	getSound.responseType = "arraybuffer"; // Read as Binary Data
	getSound.onload = function () {
		context.decodeAudioData(getSound.response, function (buffer) {
			//electro = buffer; // Decode the Audio Data and Store it in a Variable
			namesAndSounds.push({ name: element.dataset.src, buffer: buffer });
		});
	}
	getSound.send();
	element.addEventListener("click", function (event) {
		let songName = event.target.getAttribute("data-src");
		namesAndSounds.forEach(ele => {
			if (ele.name === songName) {
				electro = ele.buffer;
				let playSound = context.createBufferSource(); // Declare a New Sound
				playSound.buffer = electro; // Attatch our Audio Data as it's Buffer
				playSound.connect(context.destination);  // Link the Sound to the Output
				playSound.start(0); // Play the Sound Immediately
			}
		});
	});
}

(function(){
	
	var context = new AudioContext(); // Create and Initialize the Audio Context
	var electro; // Create the Sound 
	var getSound = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
	getSound.open("GET", "./3.Rebuttals/COD.wav", true); // Path to Audio File
	getSound.responseType = "arraybuffer"; // Read as Binary Data
	getSound.onload = function() {
		context.decodeAudioData(getSound.response, function(buffer){
			electro = buffer; // Decode the Audio Data and Store it in a Variable
		});
	}
	getSound.send(); // Send the Request and Load the File
	
	window.addEventListener("keydown",onKeyDown); // Create Event Listener for KeyDown
	
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