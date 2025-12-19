//make a wheel of names
let container = document.querySelector('.wheelContainer');
let btn = document.getElementById('spin');
let numberOne = Math.ceil(pickName);

btn.onclick = function () {
    container.style.transition = 'transform 2s ease-out';
    container.style.transform = `rotate(${numberOne}deg)`;
    numberOne += Math.ceil(Math.random() * 1000); // Increase the rotation angle for the next spin

}

//we want this to randomly land on a name