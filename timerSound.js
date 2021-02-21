function timerSound(){
    let audio = document.createElement('audio');
    audio.src = './assets/ding.mp3'
    audio.play();
    return(!audio.pause);
}