let header__burger = document.querySelector('.header__burger');
let header_menu = document.querySelector('.header');
let header__list = document.querySelector('.header__list');

header__burger.onclick = function() {
    header__burger.classList.toggle('active');
    header_menu.classList.toggle('active');
}

let pageWidth = document.documentElement.scrollWidth;
const images = document.querySelectorAll('.slider-mini img');
const imageBig = document.querySelectorAll('.slider-line img');
const sliderLine = document.querySelector('.slider-line');
const sliderLittle = document.querySelector('.slider-mini');
let width;
let offset = 100;
let count;
let oneRb = document.getElementById('check_one');
let twoRb = document.getElementById('check_two');
let threeRb = document.getElementById('check_three');

if (pageWidth > 390){
    twoRb.checked = true;
    function rollsliderBig() {
        sliderLine.style.transform = 'translate(-'+count*width+'px)';
    };

    document.querySelector('.slider-next').addEventListener('click', function(){
        offset += 59.5
        if(offset >= 159.5){
            document.querySelector('.slider-next').disabled = true;
        }
        document.querySelector('.slider-prev').disabled = false;
        sliderLine.style.left = -offset + '%';
        
        radio_checked();
    });

    document.querySelector('.slider-prev').addEventListener('click', function(){
        offset -= 59.5
        if(offset <= 40.5){
            document.querySelector('.slider-prev').disabled = true;
        }
        document.querySelector('.slider-next').disabled = false;
        sliderLine.style.left = -offset + '%';
    
        radio_checked();
    });
    function radio_move() {
        if (oneRb.checked) {
            offset = 40.5;       
        } else if (twoRb.checked){
            offset = 100;
        }else if (threeRb.checked){
            offset = 159.5;
        }
    }
    oneRb.addEventListener('click', function(){
        radio_move();
        sliderLine.style.left = -40.5 + '%';
    });
    twoRb.addEventListener('click', function(){
        radio_move();
        sliderLine.style.left = -100 + '%';
    });
    threeRb.addEventListener('click', function(){
        radio_move();
        sliderLine.style.left = -159.5 + '%';
    });
    function radio_checked() {
        if (offset === 40.5) {
            oneRb.checked = true;       
        } else if (offset === 100){
            twoRb.checked = true;
        }else{
            threeRb.checked = true;
        }
        }
}else if (pageWidth <= 390) {
    count = 0;
    document.querySelector('.slider-next__little').addEventListener('click', function(){
        count++;
        if (count > images.length - 1) {
            count = 0;
        }
        rollslider();
        radio_checked();
    });
    document.querySelector('.slider-prev__little').addEventListener('click', function(){
        count--;
        if (count < 0) {
            count = images.length - 1;
        }
        rollslider();
        radio_checked();
    });
    function init(){
        width = 360
        sliderLittle.style.width = width*images.length + 'px';
};

function radio_move() {
    if (oneRb.checked) {
        count = 0;       
    } else if (twoRb.checked){
        count = 1;
    }else if (threeRb.checked){
        count = 2;
    }
};

radio_checked();
window.addEventListener('resize', init);
init();
oneRb.addEventListener('click', function(){
    radio_move();
    rollslider();
});
twoRb.addEventListener('click', function(){
    radio_move();
    rollslider();
});
threeRb.addEventListener('click', function(){
    radio_move();
    rollslider();
});
function radio_checked() {
    if (count === 0) {
        oneRb.checked = true;       
    } else if (count === 1){
        twoRb.checked = true;
    }else{
        threeRb.checked = true;
    }
    }
};


function rollslider() {
    sliderLittle.style.transform = 'translate(-'+count*width+'px)';
};

rollslider();
window.onresize = function(event) {
    if (document.documentElement.clientWidth === 1440) {
        window.location.reload();
    } else if(document.documentElement.clientWidth === 390) {
        window.location.reload();
    }};


    console.log(
        'Приветствую! я долго мучался с этим заданием... И адаптив слайда мне так и не поддался. Так что я знаю об этой по проблеме, но по условия задания на оценку она не влияет)) Поэтому надеюсь, что за это не будут снижать баллы.\n1. Слайдер изображений в секции destinations +50/50 на десктоп варианте при клике на урезанную картинку слева или справа изображение меняется по принципу карусели (например если нажать правую картинку та что была в центре на уезжает налево, а та что была видна наполовину оказывается справа).Слайдер может быть как конечным так и бесконечным - данный критерий не должен влиять на оценку + 20/20\n- три точки внизу отображают "номер слайда", то есть каждому слайду соответствует свой кружочек, который становится активным при нахождении соответствующего ему слайда в центре. На мобильном варианте картинка одна, но поверх нее появляются стрелочки навигации (можно сделать как карусель или же затемнять кнопку если слайдер достиг края) +20/20\n- анимации плавного перемещения для слайдера +10/10\n2. Нажатие на кнопку Login (кнопка Account в мобильной версии) показывает сверстанный логин попап + 50/50\n- логин попап соответствует верстке его закрытие происходит при клике вне попапа +25/25\n- логин попап имеет 2 инпута (логин и пароль) при нажатии на кнопку Sign In показывается браузерный алерт с введенными данными (для реализации можно использовать тег ) +25/25\n3. Нажатие на кнопку Register на Login попапе меняет разметку попапа на разметку Sign Up попапа согласно макету (То есть нажатие не закрывает модал а просто меняет его наполнение). +17/25(моя невнимательность и спешка, внимательно вчитался в условие когда уже не осталось времени)\n Итого: 117/125 баллов.'
      )
