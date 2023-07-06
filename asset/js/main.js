import { ngotAlbum1 } from "./album1-ngot.js";
import { ngotAlbum2 } from "./album2-ngot.js";
import { ngotAlbum3 } from "./album3-ngot.js"
const fullListAlbum = [];
const finalList = fullListAlbum.concat([ngotAlbum1, ngotAlbum2, ngotAlbum3]);
var currentIndex = 0;
var currentIndexAlbum = 0;

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const headingSong = $('.name--song--play')
const headingArticle = $('.article--name--song-play')
const cdThumb = $('.cd--thumb')
const audio = $('#audio');
const getListSongMain = $(".list--song--main");
var playBtn = $('.action--button');
var _this = this;
var isPlayed = false;
const progress = $(".process-range--music");
const nextSong = $('.nextSong');
const previousSong = $('.previousSong');
const next15s = $('.next15sec');
const back15s = $('.back15s');
const randomButton = $('.random--btn')
Math.floor(Math.random() * ngotAlbum1)
var isRandom = false;
const repeat = $('.repeat');
var isRepeat = false;
const playList = $(".list--song--main");
const getT = $('.action--button i');
const getSongActive = $('.activeSong ');
const volumeRange = $('.volume-range')
const playInSong = $('.play-action--click');
const volumeRangeSet = $('.volume--range--set');
const processRangeSet = $('.process--play-set');
const volumeIcon = $('.volume--icon');
const toggleVolume = $('.vl--1')
const favoriteSong = $('.favorite--song')
const shareSong = $('.sharing--song');
var isMute = false;
var isFavorites = false;
const trackList = $('.track--list');
const tracksSong = $$('.track--item')
const isCheck = false;



document.onkeyup = function (e) {
    if (e.keyCode === 32 || e.keyCode === 75) {
        playBtn.click();
    }

    if (e.keyCode === 74) {
        back15second()
    }
    if (e.keyCode === 76) {
        next15second()
    }
    if (e.keyCode === 77) {
        muteVolume()
    }
    if (e.keyCode === 82) {
        randomSong();
    }

}

start();
function start() {
    render();
    handleEvents();
    loadCurrentSong();
    renderList();
}

function renderList() {

    var html = finalList.map((alb, index) => {
        return `<div class="track--item ${index === currentIndexAlbum ? 'activeAlbum' : ''}" index-album="${index}">
        <figure class="track--item--block">
            <img
                src="${alb[index].images}"
                alt=""
                class="track--item--img"
            />
        </figure>
        <div class="information--track">
            <div class="row row--track-item">
                <div class="left--information--track">
                    <h3 class="track--title">
                    ${alb[index].albumCover}
                    </h3>
                    <span class="number--track"
                        >${alb.length} tracks</span
                    >
                </div>
                    <div class="play--btn--track--block">
                    <button class="play--btn--track " >
                    <svg
                        class="play--btn"
                        width="39"
                        height="39"
                        viewBox="0 0 39 39"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="Group 11">
                            <path
                                id="Ellipse 7"
                                d="M1.19695 22.6845C0.695284 22.7718 0.357164 23.2498 0.468057 23.7468C1.10205 26.5881 2.3652 29.2555 4.16902 31.5504C6.16302 34.0872 8.75538 36.0896 11.7137 37.378C14.672 38.6664 17.9038 39.2006 21.1194 38.9326C24.335 38.6647 27.4338 37.6029 30.138 35.8426C32.8423 34.0823 35.0675 31.6785 36.6141 28.8466C38.1607 26.0147 38.9804 22.8432 38.9997 19.6166C39.0189 16.3899 38.2372 13.2089 36.7246 10.3587C35.3562 7.78034 33.4284 5.54562 31.0869 3.81582C30.6774 3.51325 30.1033 3.62893 29.8205 4.05233C29.5376 4.47573 29.6532 5.04636 30.0612 5.35094C32.1498 6.90985 33.8705 8.91433 35.0958 11.2231C36.4654 13.8038 37.1732 16.684 37.1557 19.6055C37.1383 22.5271 36.3961 25.3986 34.9957 27.9627C33.5954 30.5269 31.5806 32.7034 29.1321 34.2972C26.6835 35.8911 23.8778 36.8524 20.9663 37.095C18.0548 37.3377 15.1286 36.854 12.45 35.6874C9.77142 34.5208 7.4242 32.7078 5.61875 30.4108C4.00352 28.3559 2.86709 25.971 2.28697 23.4303C2.17362 22.9338 1.69861 22.5972 1.19695 22.6845Z"
                                fill="currentColor"
                                class="inner--play--btn"
                            />
                            <path
                                id="Polygon 1"
                                d="M27.5 19.134C28.1667 19.5189 28.1667 20.4811 27.5 20.866L17 26.9282C16.3333 27.3131 15.5 26.832 15.5 26.0622L15.5 13.9378C15.5 13.168 16.3333 12.6869 17 13.0718L27.5 19.134Z"
                                fill="currentColor"
                            />
                        </g>
                    </svg>
                </button>
                    </div>
            </div>
        </div>
    </div>`

    })
    trackList.innerHTML = html.join('\n');

}
trackList.onclick = function (e) {
    var song = (e.target.closest('.track--item:not(.activeAlbum)'));
    console.log(song)
    if ((e.target.closest('.track--item:not(.activeAlbum)'))) {
        var res = Number(song.getAttribute('index-album'));
        console.log(currentIndexAlbum)
        currentIndexAlbum = res;
        // tracksSong[currentIndexAlbum].classList.toggle('run', isCheck);
        render()
        renderList()
        loadCurrentSong();
        audio.play();
    }
}


function render() {

    const html = finalList[currentIndexAlbum].map((song, index) => {
        return `<div class= "song--item ${index === currentIndex ? 'activeSong' : ''}" data-index="${index}" >
        <div class="row row--song">
            <span class="number--order">${index + 1}</span>
            <img
                src="${song.images}"
                alt=""
                class="thumb--song"
            />
            <h3 class="name--song">
               <p class="nameofSong">${song.name} </p> 
               <p class="singerOfSong">${song.singer}</p>
            </h3>
            <h4 class="time--square">${song.albumCover}</h4>
            <div class="music--waves" ${index === currentIndex ? 'style="visibility:visible"' : 'style="visibility:hidden"'}" >
                <div class="wave--item"></div>
                <div class="wave--item"></div>
                <div class="wave--item"></div>
                <div class="wave--item"></div>
                <div class="wave--item"></div>
            </div>
            <figure class="play-action--click">
                <div class="btn--pause">
                <i class="fa-solid fa-ellipsis-vertical icon--more--setting"></i>
                </div>
            </figure>
        </div>
    </div> `
    })

    getListSongMain.innerHTML = html.join('\n');

}
function handleEvents() {
    playBtn.onclick = function () {

        if (isPlayed) {
            audio.pause();
        }
        else {
            audio.play();

        }
        audio.onplay = function () {
            isPlayed = true;
            getT.classList.remove('.fa-solid.fa-circle-play');
            playBtn.innerHTML = `<i class= "fa-solid fa-circle-pause"></i > `

        }
        audio.onpause = function () {
            isPlayed = false;
            getT.classList.remove('.fa-solid.fa-circle-pause');
            playBtn.innerHTML = `<i class= "fa-solid fa-circle-play"></i > `


        }

    }
    audio.onended = function () {
        if (isRandom) {
            playRandomSong();
        } else if (isRepeat) {
            playRepeatSong();
        }
        else nextSongFunc();

    }
    audio.ontimeupdate = function () {
        const progressStart = $(".play-time-start");
        const progressEnd = $(".play-time-end");
        progress.value = Math.floor(audio.currentTime / audio.duration * 100);
        processRangeSet.style.width = ((audio.currentTime / audio.duration)) * 502 + 'px';

        let currentMin = Math.floor(audio.currentTime / 60);
        let currentSec = Math.floor(audio.currentTime % 60);
        if (currentMin < 10) {
            currentMin = `0${currentMin}`;
        }
        if (currentSec < 10) {
            currentSec = `0${currentSec}`;
        }
        progressStart.innerText = `${currentMin}:${currentSec}`;
        if (!isNaN(audio.duration)) {
            let totalMin = Math.floor(audio.duration / 60);
            let totalSec = Math.floor(audio.duration % 60);
            if (totalMin < 10) {
                totalMin = `0${totalMin}`;
            }
            if (totalSec < 10) {
                totalSec = `0${totalSec}`;
            }
            progressEnd.innerText = `${totalMin}:${totalSec}`;
        }
    }

}
playList.onclick = function (e) {
    var song = (e.target.closest('.song--item:not(.activeSong)'));
    if (song) {
        var res = Number(song.getAttribute('data-index'));
        currentIndex = res;
        console.log(currentIndex)
        audio.onplay = function () {
            isPlayed = true;
            getT.classList.remove('.fa-solid.fa-circle-play');
            playBtn.innerHTML = `<i class= "fa-solid fa-circle-pause"></i>`

        }
        audio.onpause = function () {
            isPlayed = false;
            getT.classList.remove('.fa-solid.fa-circle-pause');
            playBtn.innerHTML = `<i class= "fa-solid fa-circle-play"></i>`
        }
        render()
        loadCurrentSong()
        audio.play();

    }
}
volumeIcon.onclick = function () {
    muteVolume();
}
favoriteSong.onclick = function () {
    isFavorites = !isFavorites;
    favoriteSong.classList.toggle('active', isFavorites);
}

volumeRange.onchange = function (e) {
    var res = (Number(e.target.value) / 100);
    audio.volume = res;
    volumeRangeSet.style.width = (res * 129) + 'px';
}
progress.onchange = function (e) {
    const seekTime = audio.duration / 100 * e.target.value;
    audio.currentTime = seekTime;
    // console.log(seekTime)
    // console.log()
    processRangeSet.style.width = ((audio.currentTime / audio.duration)) * 502 + 'px';
}
nextSong.onclick = function () {
    if (isRandom) {
        playRandomSong();
    }
    else nextSongFunc();


}
previousSong.onclick = function () {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = 0;
    }
    render()
    loadCurrentSong();
    audio.play();

}
next15s.onclick = function () {
    next15second();
}
back15s.onclick = function () {
    back15second()
}
randomButton.onclick = function () {
    randomSong();
}
repeat.onclick = function () {
    isRepeat = !isRepeat;
    repeat.classList.toggle("active", isRepeat);
    if (isRepeat) {
        randomButton.style.pointerEvents = "none";
    } else {
        randomButton.style.pointerEvents = "auto";
    }

}
shareSong.onclick = function () {

}
function loadCurrentSong() {
    headingSong.textContent = finalList[currentIndexAlbum][currentIndex].name;
    headingArticle.textContent = finalList[currentIndexAlbum][currentIndex].singer;
    cdThumb.src = finalList[currentIndexAlbum][currentIndex].images
    audio.src = finalList[currentIndexAlbum][currentIndex].path

}
function playRandomSong() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * finalList[currentIndexAlbum].length);

    } while (newIndex === currentIndex);
    currentIndex = newIndex;

    render();
    loadCurrentSong();
    audio.play();

}
function nextSongFunc() {
    currentIndex++;
    if (currentIndex >= finalList[currentIndexAlbum].length) {
        currentIndex = 0;
    }
    processRangeSet.style.width = 0 + 'px'
    render()
    loadCurrentSong();
    audio.play();
}
function playRepeatSong() {
    loadCurrentSong()
    audio.play();

}



function back15second() {
    audio.currentTime = audio.currentTime - 15
    if (audio.currentTime <= 0) {
        if (isRandom) {
            playRandomSong()
        }
        else if (isRepeat) {
            playRepeatSong()
        }
        else {
            currentIndex--;
            if (currentIndex <= 0) {
                currentIndex = finalList[currentIndexAlbum].length - 1;
            }
        }
        render()
        loadCurrentSong()
        audio.play();

    }
}
function next15second() {
    audio.currentTime = audio.currentTime + 15
    if (audio.currentTime == audio.duration) {
        if (isRandom) {
            playRandomSong()
        } else if (isRepeat) {
            playRepeatSong()
        } else {
            {
                currentIndex++;
                if (currentIndex >= finalList[currentIndexAlbum].length) {
                    currentIndex = 0;


                }
            }
        }
        render()

        loadCurrentSong()
        audio.play();

    }
}
function muteVolume() {
    isMute = !isMute;

    toggleVolume.classList.toggle('activeMute', isMute);
    if (isMute) {
        audio.volume = 0;
        volumeRangeSet.style.width = 0 + 'px';
        volumeRange.value = 0;

    } else {
        audio.volume = 0.6;
        volumeRangeSet.style.width = 0.6 * 129 + 'px';
        volumeRange.value = 60;

    }
}
function randomSong() {
    isRandom = !isRandom;
    randomButton.classList.toggle("active", isRandom);
    if (isRandom) {
        repeat.style.pointerEvents = "none";
    } else {
        repeat.style.pointerEvents = "auto";

    }


}
