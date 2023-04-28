const ACTIVE_CLASS = 'active';

const navEl = document.querySelector('header nav');

function showMenu() {
    navEl.classList.add(ACTIVE_CLASS);
}

function hideMenu() {
    navEl.classList.remove(ACTIVE_CLASS);
}