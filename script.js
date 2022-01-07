const play = document.querySelector('.play'),
      time = document.querySelector('.time-prog'),
      current = document.querySelector('.current'),
      duration = document.querySelector('.duration');

let audio = new Audio('https://sujer-ux.github.io/pb.su/songs/widar_love.mp3');

play.onclick = playSong;
function playSong() {
    if (!play.classList.contains('played')) {
        audio.play();
        play.classList.add('played');
    } else {
        audio.pause();
        play.classList.remove('played');
    }
}


function rew() {
    let w,
        o,
        timer = true;
        
    if (timer) {
        audio.addEventListener('timeupdate', timeUpdate);
    }

    
    time.parentNode.addEventListener('mousedown', hintW);
    function hintW() {
        time.parentNode.addEventListener('mousemove', hintMove);
        audio.removeEventListener('timeupdate', timeUpdate);
        timer = false;
    }
    
    time.parentNode.addEventListener('mouseup', timeMouseup);
    function timeMouseup() {
        time.parentNode.removeEventListener('mousemove', hintMove);
        audio.addEventListener('timeupdate', timeUpdate);
        setTime();
    }

    
    
    function timeUpdate() {
        let d = audio.duration;
        let c = audio.currentTime;
        time.style.width = (100 * c) / d + '%';
        current.innerHTML = formatted(audio.currentTime);
    }
    function hintMove() {
        w = time.parentNode.offsetWidth;
        o = event.offsetX;
        time.style.width = (100 * o) / w + '%';
    }
    function setTime() {
        w = time.parentNode.offsetWidth;
        o = event.offsetX;
        audio.currentTime = audio.duration * o/w;
    }
}


rew();

audio.onended = function() {
    play.classList.remove('played');
}

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
