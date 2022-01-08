const play = document.querySelector('.play'),
      time = document.querySelector('.time-prog'),
      current = document.querySelector('.current'),
      duration = document.querySelector('.duration'),
      audio = new Audio('https://sujer-ux.github.io/pb.su/songs/widar_love.mp3');

function playPause() {
    play.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            this.classList.add('played');
        } else {
            audio.pause();
            this.classList.remove('played');
        }
    });
    audio.addEventListener('ended', () => play.classList.remove('played'));
}
playPause();

function rew(elem, audio) {
    let w = elem.parentNode.offsetWidth, offsX;
    
    audio.addEventListener('timeupdate', timeUpdate);
    
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        
        elem.parentNode.addEventListener('touchstart', function(e) {
            this.addEventListener('touchmove', hintMove);
            audio.removeEventListener('timeupdate', timeUpdate);
        });

        elem.parentNode.addEventListener('touchend', function(e) {
            this.removeEventListener('touchmove', hintMove);
            audio.addEventListener('timeupdate', timeUpdate);
            setTime(e)
        });
        
    } else {
        
        elem.parentNode.addEventListener('mousedown', function(e) {
            this.addEventListener('mousemove', hintMove);
            audio.removeEventListener('timeupdate', timeUpdate);
        });

        elem.parentNode.addEventListener('mouseup', function(e) {
            this.removeEventListener('mousemove', hintMove);
            audio.addEventListener('timeupdate', timeUpdate);
            setTime(e);
        });
    }
    
    function setTime(e) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            offsX = e.changedTouches[0].pageX - e.target.getBoundingClientRect().x;
        } else {
            offsX = e.offsetX;
        }
        audio.currentTime = audio.duration * offsX / w;
    }
    function timeUpdate() {
        elem.style.width = (100 * this.currentTime) / this.duration + '%';
        current.innerHTML = formatted(this.currentTime);
    }
    function hintMove(e) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            offsX = e.changedTouches[0].pageX - e.target.getBoundingClientRect().x;
        } else {
            offsX = e.offsetX;
        }
        let setW = (100 * offsX) / w;     
        setW = minMax(setW, 0, 100);
        elem.style.width = minMax(setW, 0, 100) + '%';
        
        function setPreCrnt() {
            let preCrnt = audio.duration * (offsX / w);
            current.innerHTML = formatted(minMax(preCrnt, 0, audio.duration));
        }
        setPreCrnt();
    }
    audio.addEventListener('canplaythrough', () => duration.innerHTML = formatted(audio.duration));
}
rew(time, audio);

function minMax(num, min, max) {
    if (num < min) {
        num = min;
    } else if (num > max) {
        num = max;
    }
    return num;
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

