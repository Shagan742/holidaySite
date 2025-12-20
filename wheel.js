//make a wheel of names
let container = document.querySelector('.wheelContainer');
let spin = document.getElementById('spin');
let numberOne = 10000;

spin.onclick = function () {
    container.style.transition = 'transform 5s ease-out';
    container.style.transform = `rotate(${numberOne}deg)`;
    numberOne +=Math.random()*1000; // Increase the rotation angle for the next spin

}

//we want this to randomly land on an item