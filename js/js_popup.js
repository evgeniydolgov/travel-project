const popupLinks = document.querySelectorAll('.popup-link');

for(let i=0; i<popupLinks.length; i++) {
    const popupLink = popupLinks[i];
    popupLink.addEventListener('click', function (e) {
        const popupName = popupLink.getAttribute('href').replace('#','');
        const curentPopup = document.getElementById(popupName);
        popupOpen(curentPopup);
        e.preventDefault();
    });
}

function popupOpen(curentPopup) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
        popupClose(popupActive, false);
    }
        curentPopup.classList.add('open');
        curentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup__content')){
                popupClose(e.target.closest('.popup'));
            }
        });
    }

function popupClose(popupActive) {
    popupActive.classList.remove('open');
}

let sing = document.querySelectorAll('.popup-one__sing');
let login = document.querySelectorAll('.popup-one__email__input input');
let password = document.querySelectorAll('.popup-one__password__input input');

function alertClick () {
    for (let i=0; i<sing.length; i++){
        sing[i].addEventListener('click', function (){
        alert("Login: " + login[i].value  + "\n Password: " + password[i].value);
        })}};
alertClick();