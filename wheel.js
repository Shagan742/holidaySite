//make a wheel of names
let container = document.querySelector('.wheelContainer');
let btn = document.getElementById('spin');
let number = Math.ceil(Math.random() * 1000);
let numbers = [1, 2, 3, 4, 5, 6, 7, 8];

btn.onclick = function () {
    container.style.transition = 'transform 2s ease-out';
    container.style.transform = `rotate(${number}deg)`;
    number += Math.ceil(Math.random() * 1000); // Increase the rotation angle for the next spin

}