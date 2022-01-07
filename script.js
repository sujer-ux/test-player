const play = document.querySelector('.play'),
      time = document.querySelector('.time-prog'),
      current = document.querySelector('.current'),
      duration = document.querySelector('.duration');

let audio = new Audio('https://sujer-ux.github.io/pb.su/songs/widar_love.mp3');

play.onclick = playSong;
function playSong() {
    if (audio.paused) {
        audio.play();
        play.classList.add('played');
    } else {
        audio.pause();
        play.classList.remove('played');
    }
}

audio.onended = function() {
    play.classList.remove('played');
}

function rew(elem, audio) {
    let w = elem.parentNode.offsetWidth;
    
    audio.addEventListener('timeupdate', timeUpdate);
    
    elem.parentNode.addEventListener('mousedown', function() {
        this.addEventListener('mousemove', hintMove);
        audio.removeEventListener('timeupdate', timeUpdate);
    });
    
    elem.parentNode.addEventListener('mouseup', function() {
        this.removeEventListener('mousemove', hintMove);
        audio.addEventListener('timeupdate', timeUpdate);
        setTime();
    });

    
    function timeUpdate() {
        elem.style.width = (100 * audio.currentTime) / audio.duration + '%';
        current.innerHTML = formatted(audio.currentTime);
    }
    function hintMove() {
        elem.style.width = (100 * event.offsetX) / w + '%';
    }
    function setTime() {
        audio.currentTime = audio.duration * event.offsetX / w;
    }
}
rew(time, audio);

function formatted(input) {
    let timeStamp = input;
    let minutes = Math.floor(timeStamp / 60);
    let seconds = Math.floor(timeStamp % 60);
    let formatted = [
        minutes.toString().padStart (2, '0'),
        seconds.toString().padStart (2, '0')
    ].join(':');
    return formatted;
}
audio.addEventListener('canplaythrough', () => duration.innerHTML = formatted(audio.duration));
