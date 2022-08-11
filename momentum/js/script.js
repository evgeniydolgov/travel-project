const time = document.querySelector('.time');
const dateElement = document.querySelector('.date');
const dayOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const userGreeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const body = document.querySelector('body');
let randomNum = (Math.floor(Math.random() * (20 - 1 + 1)) + 1).toString().padStart(2,0);
const nextButton = document.querySelector('.slide-next');
const prevButton = document.querySelector('.slide-prev');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const buttonRefresh = document.querySelector('.change-quote');
const nameSong = document.querySelector('.name-song');
const timeSong = document.querySelector('.time_song');

prevButton.addEventListener('click', function getSlideNext() {
    randomNum --;
    if (randomNum < 1) randomNum = '20';
    randomNum = randomNum.toString().padStart(2,0);
    setBg();
});

nextButton.addEventListener('click', function getSlideNext() {
    randomNum ++;
    if (randomNum > 20) randomNum = '01';
    randomNum = randomNum.toString().padStart(2,0);
    setBg();
});

function showTime () {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    setTimeout(showTime, 1000);
    showDate();
    getTimeOfDay();
    return time.textContent = currentTime;
}
showTime();

function showDate () {
    const dateDay = new Date();
    const day = dateDay.getDay();
    const options = { month: 'long', day: 'numeric'};
    const currentDate = dateDay.toLocaleDateString('en-US', options);
    return dateElement.textContent = dayOfWeek[day] + ', ' + currentDate;
}

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    let greeting;
    if (hours >= 0 && hours < 6) {
        greeting = 'Good night';
    } else if (hours >= 6 && hours < 12) {
        greeting = 'Good morning';
    } else if (hours >= 12 && hours < 18) {
        greeting = 'Good afternoon';
    }else {
        greeting = 'Good evening';
    }
    return greeting, userGreeting.textContent = greeting;
}

function setLocalStorage() {
    localStorage.setItem('name', name.value);
  }
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }
  }
window.addEventListener('load', getLocalStorage);


function getRandomNum(x){
    return x;
}

function setBg(){
    let z;
    let x = randomNum;
    let y;
    let greeting = getTimeOfDay();
    if (greeting === 'Good night') {
        y = 'night';
    } else if (greeting === 'Good morning') {
        y = 'morning';
    } else if (greeting === 'Good afternoon') {
        y = 'afternoon';
    } else {
        y = 'evening'
    }
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${y}/${x}.jpg`
    img.onload = () => {      
    return body.style.backgroundImage =`url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${y}/${x}.jpg')`
};
}
setBg();
let temperatureOfCity = 'Minsk';
async function getWeather() {  

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${temperatureOfCity}&lang=en&appid=4c9f9712a3c43ff618f104e1c698e202&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity} %`;
  }
  getWeather();
  city.addEventListener('change',() => {
    temperatureOfCity = city.value;
    return  getWeather();
});

function setLocalStorageCity() {
    localStorage.setItem('city', city.value);
  }
window.addEventListener('beforeunload', setLocalStorageCity);

function getLocalStorageCity() {
    if(localStorage.getItem('city')) {
      city.value = localStorage.getItem('city');
    }
  }
window.addEventListener('load', getLocalStorageCity);


async function getQuotes() {  
    const quotes = './js/data.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    let randomQuote = (Math.floor(Math.random() * (8 - 1 + 1)) + 1);
    quote.textContent = '"' + data[randomQuote - 1].quote + '"';
    author.textContent = '"' + data[randomQuote - 1].source + '"';
}

getQuotes();
buttonRefresh.addEventListener('click',getQuotes);

/*-----------------------------------------audio-------------------------------------------------------*/

import playList from './playList.js';

const audio = new Audio();
let isPlay = false;
let playNum = 0;
// const trackOne = './assets/sounds/Aqua Caelestis.mp3';
// const trackTwo = './assets/sounds/Ennio Morricone.mp3';
// const trackThree = './assets/sounds/Peer Gynt.mp3';
// const trackFour = './assets/sounds/River Flows In You.mp3';
// const trackFive = './assets/sounds/Summer Wind.mp3';
// let trackList = [trackOne,trackTwo,trackThree,trackFour,trackFive];

const prevButtonPlayer = document.querySelector('.play-prev');
const nextButtonPlayer = document.querySelector('.play-next');
const playButton = document.querySelector('.play');

function playAudio() {
    if (!isPlay){
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    } else {
        audio.pause();
        isPlay = false;
    }
    nameSong.textContent = playList[playNum].title;
};

function pauseAudio() {
    audio.pause();
};

function nextTrack() {
    playNum ++;
    if (playNum > 4) {playNum = 0};
    audio.src = playList[playNum].src;
    audio.play();
    playButton.classList.add('pause');
    isPlay = true;
    nameSong.textContent = playList[playNum].title;
};

function prevTrack () {   
    -- playNum;
    if (playNum < 0) {playNum = 4};
    audio.src = playList[playNum].src;
    audio.play();
    playButton.classList.add('pause');
    isPlay = true;
    nameSong.textContent = playList[playNum].title;
}

playButton.addEventListener('click', function() {
    playButton.classList.toggle('pause');
    playAudio();
});

nextButtonPlayer.addEventListener('click', nextTrack);

prevButtonPlayer.addEventListener('click', prevTrack);

/*-----------------------------------------audio-list--------------------------------------------------*/

playList.forEach( function (element, index) {
    const listOfSong = document.querySelector('.play-list');
    const li = document.createElement('li');
    const liImage = document.createElement('div')
    li.classList.add('track');
    liImage.classList.add('mini_play')
    li.textContent = element.title;
    listOfSong.append(li);
    li.prepend(liImage);
    li.style.display = 'flex';

    li.addEventListener('click', function(){
        if(isPlay) {
        audio.pause();
        liImage.classList.remove('mini_pause');
        playButton.classList.remove('pause');
        isPlay = false
        }else if(!isPlay) {
        liImage.classList.add('mini_pause');
        playButton.classList.add('pause');
        playNum = index;
        audio.src = playList[index].src;
        audio.currentTime = 0;
        audio.play();
        isPlay = true;
        } 
    })
    liImage.classList.remove('mini_pause');
});

/*------------------------------------------------------progress-bar--------------------------------------------*/
const progress = document.querySelector('.progress');
const timeline = document.querySelector('.timeline');

function updateProgress(e) {
    const {duration,currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`
    timeSong.textContent = `${getTimeCodeFromNum(currentTime)}/${playList[playNum].duration}`
}
audio.addEventListener('timeupdate', updateProgress);

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}
timeline.addEventListener('click', setProgress);
audio.addEventListener('ended', nextTrack)

function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
  
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
  }
/*---------------------------------------------------volume-------------------------------------------------------*/

document.querySelector('.range').oninput = setVolume;
const volumeIcon = document.querySelector('.volume_icon');
let volumeOn = true;

function setVolume () {
    let v = this.value;
    audio.volume = v/100;
    volumeOn = true;
    volumeIcon.classList.remove('volume_off_icon')
}

volumeIcon.addEventListener('click', function(){
    volumeIcon.classList.toggle('volume_off_icon');
    if (volumeOn) {
        audio.volume = 0;
        volumeOn = false;
    }else if (!volumeOn) {
        audio.volume = 0.5;
        volumeOn = true;
    }
})

