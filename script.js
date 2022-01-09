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

function mediaRewind(elem, media) {
    let mainElem = elem.parentNode,
        offsX;
    
    audio.addEventListener('timeupdate', timeUpdate);
    
    
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        
        mainElem.addEventListener('touchstart', function(e) {
            hintMove(e);
            this.addEventListener('touchmove', hintMove);
            media.removeEventListener('timeupdate', timeUpdate);
        });

        mainElem.addEventListener('touchend', function(e) {
            this.removeEventListener('touchmove', hintMove);
            media.addEventListener('timeupdate', timeUpdate);
            setTime(e, this);
        });
        
    } else {
        mainElem.addEventListener('mousedown', function(e) {
            hintMove(e);
            document.addEventListener('mousemove', hintMove);
            media.removeEventListener('timeupdate', timeUpdate);
            body.classList.add('un-select');
            document.addEventListener('mouseup', mup);
            
            function mup(e) {
                document.removeEventListener('mousemove', hintMove);
                media.addEventListener('timeupdate', timeUpdate);
                body.classList.remove('un-select');
                setTime(e, mainElem);
                
                setTimeout(function() {
                    document.removeEventListener('mouseup', mup);

                }, 1);
            }
        });
    }
    
    function setTime(e, el) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            offsX = e.changedTouches[0].pageX - mainElem.getBoundingClientRect().x;
        } else {
            offsX = e.pageX - mainElem.getBoundingClientRect().x;
        }
        media.currentTime = media.duration * offsX / el.offsetWidth;
    }
    function timeUpdate() {
        elem.style.width = (100 * this.currentTime) / this.duration + '%';
        current.innerHTML = formatted(this.currentTime);
    }
    function hintMove(e) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            offsX = e.changedTouches[0].pageX - mainElem.getBoundingClientRect().x;
        } else {
            offsX = e.pageX - mainElem.getBoundingClientRect().x;
        }
        let setW = (100 * offsX) / mainElem.offsetWidth;     
        setW = minMax(setW, 0, 100);
        elem.style.width = minMax(setW, 0, 100) + '%';
        
        function setPreCrnt(el) {
            let preCrnt = audio.duration * (offsX / el.offsetWidth);
            current.innerHTML = formatted(minMax(preCrnt, 0, audio.duration));
        }
        setPreCrnt(mainElem);
    }
    media.addEventListener('canplaythrough', () => duration.innerHTML = formatted(audio.duration));
}
mediaRewind(time, audio);

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

