let Cart = document.querySelector('.cart');
let Close = document.querySelector('.close');
let Body = document.querySelector('body');

Cart.addEventListener('click', () => {
    Body.classList.toggle('showbar')
})
Close.addEventListener('click', () => {
    Body.classList.toggle('showbar')
})