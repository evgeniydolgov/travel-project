const time = document.querySelector('.time');
const dateElement = document.querySelector('.date');
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

let hash = window.location.hash;
hash = hash.substr(1);
if (hash != 'ru' && hash != 'en') {hash = 'en'};

let numberOfPicter;
if (localStorage.getItem("numberOfPicter")){
    numberOfPicter = localStorage.getItem("numberOfPicter");
}

prevButton.addEventListener('click', function getSlideNext() {
    if (numberOfPicter === '1') {
        getLinkToImage();
    } else if (numberOfPicter === '2') {
        getLinkToImage2();
    }else {
    randomNum --;
    if (randomNum < 1) randomNum = '20';
    randomNum = randomNum.toString().padStart(2,0);
    setBg();}
});

nextButton.addEventListener('click', function getSlideNext() {
    if (numberOfPicter === '1') {
        getLinkToImage();
    } else if (numberOfPicter === '2') {
        getLinkToImage2();
    }else {
    randomNum ++;
    if (randomNum > 20) randomNum = '01';
    randomNum = randomNum.toString().padStart(2,0);
    setBg();}
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
    const currentDate = dateDay.toLocaleDateString(hash, options);
    return dateElement.textContent = dayOfWeek[hash][day] + ', ' + currentDate;
}

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    let greeting;
    if (hours >= 0 && hours < 6) {
        greeting = greetingLang[hash][0];
    } else if (hours >= 6 && hours < 12) {
        greeting = greetingLang[hash][1];
    } else if (hours >= 12 && hours < 18) {
        greeting = greetingLang[hash][2];
    }else {
        greeting = greetingLang[hash][3];
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
let greeting = getTimeOfDay();
function setBg(){
    let z;
    let x = randomNum;
    let y;

    if (greeting === greetingLang[hash][0]) {
        y = 'night';
    } else if (greeting === greetingLang[hash][1]) {
        y = 'morning';
    } else if (greeting === greetingLang[hash][2]) {
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


function setLocalStorageCity() {
    localStorage.setItem('city', city.value);
  }
window.addEventListener('beforeunload', setLocalStorageCity);

function getLocalStorageCity() {
    if(localStorage.getItem('city')) {
      city.value = localStorage.getItem('city');
    }
    return city.value
  }

window.addEventListener('load', getLocalStorageCity);
city.value = localStorage.getItem('city')

async function getWeather() { 
    if (city.value === '') {
        city.value = cityLang[hash][0];
    }
    try{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${hash}&appid=4c9f9712a3c43ff618f104e1c698e202&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${weatherLang[hash][0]} ${Math.floor(data.wind.speed)} m/s`;
    humidity.textContent = `${weatherLang[hash][1]} ${data.main.humidity} %`;
    }  catch{
        temperature.textContent = errLang[hash];
        wind.textContent = ' ';
        humidity.textContent = ' ';
    }
  }
    getWeather();


  getWeather();
  city.addEventListener('change',() => {
    city.value = city.value;
    return  getWeather();
});



async function getQuotes(hash) {  
    const quotes = './js/data.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    let randomQuote = (Math.floor(Math.random() * (8 - 1 + 1)) + 1);
    quote.textContent = '"' + data[randomQuote - 1].quote[hash] + '"';
    author.textContent = '"' + data[randomQuote - 1].source[hash] + '"';
}

getQuotes(hash);
buttonRefresh.addEventListener('click', function () {
    getQuotes(hash);
});

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
        audio.volume = 0.7;
        volumeOn = true;
    }
})


/*--------------------------------------------------------------setting-menu----------------------------------------------------------*/

const setting = document.querySelector('.setting');
const start_menu = document.querySelector('.start_menu');
const language_button = document.querySelector('.start_menu li:nth-child(1)');
const picter_button = document.querySelector('.start_menu li:nth-child(2)');
const type_button = document.querySelector('.start_menu li:nth-child(3)');
const delete_button = document.querySelector('.start_menu li:nth-child(4)');
const language_menu = document.querySelector('.language_menu');
const languageRu = document.querySelector('.language_menu li:nth-child(1)');
const languageEn = document.querySelector('.language_menu li:nth-child(2)');
const languageMenuBack = document.querySelector('.language_menu li:nth-child(3)');
const picter_menu = document.querySelector('.picter_menu');
const picter_menuBack = document.querySelector('.picter_menu li:nth-child(4)');
const type_menu = document.querySelector('.type_menu');
const type_menuNature = document.querySelector('.type_menu li:nth-child(1)');
const type_menuCity = document.querySelector('.type_menu li:nth-child(2)');
const type_menuCar = document.querySelector('.type_menu li:nth-child(3)');
const type_menuBack = document.querySelector('.type_menu li:nth-child(4)');
const type_delete = document.querySelector('.type_delete');
const delete_menuTime = document.querySelector('.type_delete li:nth-child(1)');
const delete_menuGreeting = document.querySelector('.type_delete li:nth-child(2)');
const delete_menuWeather = document.querySelector('.type_delete li:nth-child(3)');
const delete_menuAdio = document.querySelector('.type_delete li:nth-child(4)');
const delete_menuQuote = document.querySelector('.type_delete li:nth-child(5)');
const delete_menuToDo = document.querySelector('.type_delete li:nth-child(6)');
const delete_menuBack = document.querySelector('.type_delete li:nth-child(7)');
let typeOfSetting = false;
let picterSetting = '';
picterSetting = localStorage.getItem('picter');
if (picterSetting = ''){picterSetting = 'nature'};

language_button.textContent = menuLang['Language'][hash];
picter_button.textContent = menuLang["Picter"][hash];
type_button.textContent = menuLang["Сonnection"][hash];
delete_button.textContent = menuLang["Delete"][hash];
languageMenuBack.textContent = backLng[hash];
picter_menuBack.textContent = backLng[hash];
type_menuBack.textContent = backLng[hash];
delete_menuBack.textContent = backLng[hash];
if (hash === 'ru'){
    type_menuNature.textContent = 'Природа';
    type_menuCity.textContent = 'Город';
    type_menuCar.textContent = 'Машины';
    delete_menuTime.textContent = "Время/Дата";
    delete_menuGreeting.textContent = "Приветствие";
    delete_menuWeather.textContent = "Погода";
    delete_menuAdio.textContent = "Плеер";
    delete_menuQuote.textContent = "Цитаты";
}


setting.addEventListener('click', function () {
    if (!typeOfSetting) {
        start_menu.style.display = 'block';
        language_menu.style.display = 'none';
        typeOfSetting = true;
    } else if (typeOfSetting) {
        start_menu.style.display = 'none';
        language_menu.style.display = 'none';
        typeOfSetting = false;
        picter_menu.style.display = 'none';
        type_delete.style.display = 'none';
        type_menu.style.display = 'none';
    }
})

language_button.addEventListener('click', function () {
    start_menu.style.display = 'none';
    language_menu.style.display = 'block';
})

languageMenuBack.addEventListener('click', function () {
    start_menu.style.display = 'block';
    language_menu.style.display = 'none';
})

picter_button.addEventListener('click', function (){
    picter_menu.style.display = 'block';
    start_menu.style.display = 'none';
})

picter_menuBack.addEventListener('click', function () {
    start_menu.style.display = 'block';
    picter_menu.style.display = 'none';
})

type_button.addEventListener('click', function (){
    type_menu.style.display = 'block';
    start_menu.style.display = 'none';
})

type_menuBack.addEventListener('click', function (){
    type_menu.style.display = 'none';
    start_menu.style.display = 'block';
})

delete_button.addEventListener('click', function (){
    type_delete.style.display = 'block';
    start_menu.style.display = 'none';
})

delete_menuBack.addEventListener('click', function (){
    type_delete.style.display = 'none';
    start_menu.style.display = 'block';
})

function changeRuLanguage () {
    location.href = window.location.pathname + '#' + 'ru';
    location.reload();
}

function changeEnLanguage () {
    location.href = window.location.pathname + '#' + 'en';
    location.reload();
}

languageRu.addEventListener('click', changeRuLanguage);
languageEn.addEventListener('click', changeEnLanguage);

/*------------------------------------------------------DELETE-Object------------------------------------------------------------*/

const player = document.querySelector('.player');
const weather = document.querySelector('.weather')
const quoteBlock = document.querySelector('.quote-block')

function isDeleteObject(element) {
    element.classList.toggle('active');
}

function memoryAboutUser(element) { // доделать запоминание настроек пользователя в local storage
    if (localStorage.getItem('isClick')){
        element.classList.add('active');
        localStorage.removeItem('isClick')
    };
}

delete_menuAdio.addEventListener('click', () => {isDeleteObject(player)});
delete_menuTime.addEventListener('click', () => {isDeleteObject(time)});
delete_menuTime.addEventListener('click', () => {isDeleteObject(dateElement)});
delete_menuGreeting.addEventListener('click', () => {isDeleteObject(userGreeting)});
delete_menuGreeting.addEventListener('click', () => {isDeleteObject(name)});
delete_menuWeather.addEventListener('click', () => {isDeleteObject(weather)});
delete_menuQuote.addEventListener('click', () => {isDeleteObject(quoteBlock)});

/*--------------------------------------------APi-images--------------------------------------------*/

const picter_menuGit = document.querySelector('.picter_menu li:nth-child(1)');
const picter_menuUnsplash = document.querySelector('.picter_menu li:nth-child(2)');
const picter_menuFlickr = document.querySelector('.picter_menu li:nth-child(3)');

picter_menuGit.addEventListener("click", function () {
    localStorage.setItem("numberOfPicter", 0)
    numberOfPicter = "0";
    picterChouse();
});

picter_menuUnsplash.addEventListener("click", function () {
    localStorage.setItem("numberOfPicter", 1)
    numberOfPicter = "1";
    picterChouse();
});

picter_menuFlickr.addEventListener("click", function () {
    localStorage.setItem("numberOfPicter", 2)
    numberOfPicter = "2";
    picterChouse();
});


function picterChouse () {
if (numberOfPicter === '1') {
   return getLinkToImage();
} else if (numberOfPicter === '2') {
   return getLinkToImage2();
} else {
   return setBg();
}}
picterChouse();

let typeOfPicter;


   function typePicter(elem) {
    localStorage.setItem('picter', elem)
    picterSetting = elem;
    if (numberOfPicter === '1') {
        getLinkToImage();
    } else if (numberOfPicter === '2') {
        getLinkToImage2();
    }
   };

   type_menuNature.addEventListener('click', () => typePicter('nature'));
   type_menuCity.addEventListener('click', () => typePicter('city') );
   type_menuCar.addEventListener('click', () => typePicter('car') );


async function getLinkToImage() {    
    let y;
    if (greeting === greetingLang[hash][0]) {
        y = 'night';
    } else if (greeting === greetingLang[hash][1]) {
        y = 'morning';
    } else if (greeting === greetingLang[hash][2]) {
        y = 'day';
    } else {
        y = 'evening'
    }
    const url = `https://api.unsplash.com/photos/random?query=${picterSetting},${y}&client_id=VoA_JV_f9kR61CeHI8qvq9mbkuKNaOhOiAnDATgKtEU`;
    const res = await fetch(url);
    const data = await res.json();
    return [
        body.style.backgroundImage = `url(${data.urls.regular})`,
        body.style.backgroundRepeat = 'no-repeat',
        body.style.backgroundSize = '100% 100%'
    ];
   }

async function getLinkToImage2 (){
    let y;
    if (greeting === greetingLang[hash][0]) {
        y = 'night';
    } else if (greeting === greetingLang[hash][1]) {
        y = 'morning';
    } else if (greeting === greetingLang[hash][2]) {
        y = 'day';
    } else {
        y = 'evening'
    }
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=4405beba23fb8050383e9cef97b67396&tags=${picterSetting},${y}&extras=url_l&format=json&nojsoncallback=1`
    const res = await fetch (url);
    const data = await res.json();
    let x = data.photos.photo[Math.floor(Math.random() * (data.photos.photo.length - 1)) + 1].url_l;
    return [
        body.style.backgroundImage = `url(${x})`,
        body.style.backgroundRepeat = 'no-repeat',
        body.style.backgroundSize = '100% 100%'
    ];
}   
