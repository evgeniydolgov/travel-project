let header__burger = document.querySelector('.header__burger');
let header_menu = document.querySelector('.header');
let back = document.querySelector('body');
let header__list = document.querySelector('.header__list');

header__burger.onclick = function() {
    header__burger.classList.toggle('active');
    header_menu.classList.toggle('active');
    back.classList.toggle('lock');
}

console.log (('1.верска соответсвует макету +48\n2.нет горизонтальной полосы прокрутки +15\n3.на ширине 390 есть адаптивное меню +18 \n4.-4 балла меню не закрывается при клике на Accoun,-4 не закрывается после прокрутки по якорям \nитого 77 баллов'))
