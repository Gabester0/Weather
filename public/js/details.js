const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const zero = document.getElementById('0')
const one = document.getElementById('1')
const two = document.getElementById('2')
const three = document.getElementById('3')
const four = document.getElementById('4')
const five = document.getElementById('5')
const six = document.getElementById('6')
const seven = document.getElementById('7')
const eight = document.getElementById('8')
const nine = document.getElementById('9')
const ten = document.getElementById('10')
const eleven = document.getElementById('11')
const twelve = document.getElementById('12')
weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value
    zero.textContent = `Loading...`
    one.textContent = ``
    two.textContent = ``
    three.textContent = ``
    four.textContent = ``
    five.textContent = ``
    six.textContent = ``
    seven.textContent = ``
    eight.textContent = ``
    nine.textContent = ``
    ten.textContent = ``
    eleven.textContent = ``
    twelve.textContent = ``

    fetch(`http://localhost:3000/weather?address=${location}&forcast_days=1&hourly=1`).then( (response)=>{
        response.json().then( (data)=>{
            if(data.error) return messageOne.textContent = data.error
            zero.textContent = `Readings taken at: ${data.body.obsevation_time}`;
            one.textContent = `Daylight: ${data.body.is_day}`;
            two.textContent = `Cloud Cover: ${data.body.cloudcover}`;
            three.textContent = `Temp Feels Like: ${data.body.feelslike}`;
            four.textContent = `Humidity: ${data.body.humidity}`;
            five.textContent = `Precipitation: ${data.body.precip}`;
            six.textContent = `Pressure: ${data.body.pressure}`;
            seven.textContent = `Temperature: ${data.body.temperature}`;
            eight.textContent = `UV Index: ${data.body.uv_index}`;
            nine.textContent = `Visibility: ${data.body.visibility}`;
            ten.textContent = `Wind Degree: ${data.body.wind_degree}`;
            eleven.textContent = `Wind Direction: ${data.body.wind_dir}`;
            twelve.textContent = `Wind Speed: ${data.body.wind_speed}`;
        })
    })
})
/*
observation_time: "07:27 AM"
is_day: "no"
cloudcover: 0
feelslike: 64
humidity: 83
precip: 0.1
pressure: 995
temperature: 64
uv_index: 1
visibility: 6
weather_code: 113
wind_degree: 200
wind_dir: "SSW"
wind_speed: 0
*/