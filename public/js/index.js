console.log('hey from client');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const para1 = document.querySelector('#para1');
const para2 = document.querySelector('#para2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    para2.textContent = '';

    if (!location) {
        para1.textContent = 'Please enter the location';
    } else {
        para1.textContent = 'Fetching forecast data ....';
        fetch(`http://localhost:3000/weather?address=${location}`).then(res => {
            res.json().then(data => {
                para1.textContent = `The temperature at ${data.locationName} is ${data.temperature}\xB0 C`;
                para2.textContent = `There is ${data.precipitation} % chance of rain`;
            })
        })
    }
})