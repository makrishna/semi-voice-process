var jukeBox=document.querySelector(".player")
jukeBox.addEventListener("click",function (event){
	var songName=event.target.getAttribute("data-src")
	var audioPlayer=document.querySelector("#player");
	var audioFile = new Audio(songName);
	if(audioPlayer){
		if(songName === audioPlayer.getAttribute("src")){
			if(audioPlayer.paused){
				audioFile.play();
				event.target.id="playing"
			}else{
				audioFile.pause()
				event.target.id="paused"
			}
		}
		else{
			audioPlayer.src=songName;
			audioFile.play()
			if (document.querySelector('#playing')) {
                document.querySelector('#playing').id = '';
              }
            else {
                document.querySelector('#paused').id = '';
                
            }
            event.target.id = 'playing';

		}
	}
	else{
		var audioPlayer=document.createElement("audio");
		audioPlayer.id="player";
		document.body.appendChild(audioPlayer);
		audioPlayer.src=songName;
		audioFile.play()
		event.target.id = 'playing';
	}
})

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