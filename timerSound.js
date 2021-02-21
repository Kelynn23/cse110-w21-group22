function timerSound(){
    let audio = document.createElement('audio');
    audio.src = './assets/sound.mp3'
    audio.play();
    return(!audio.pause);
}