const EXPANDED_CLASS = 'expanded';
const BODY_EXPANDED_CLASS = 'has-expanded';

const headerEl = document.querySelector('header');

function showMenu() {
    headerEl.classList.add(EXPANDED_CLASS);
    document.body.classList.add(BODY_EXPANDED_CLASS);
}

function hideMenu() {
    headerEl.classList.remove(EXPANDED_CLASS);
    document.body.classList.remove(BODY_EXPANDED_CLASS);
}