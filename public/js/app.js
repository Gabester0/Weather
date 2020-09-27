const weatherForm = document.querySelector(`form`);
const search = document.querySelector(`input`);
const messageOne = document.getElementById(`message-one`)
const messageTwo = document.getElementById(`message-two`)
const icon = document.getElementById(`icon`);

weatherForm.addEventListener(`submit`, (e)=>{
    e.preventDefault();
    const location = search.value
    messageOne.textContent = `Loading...`
    messageTwo.textContent = ``
    icon.src = ``
    icon.classList = `display-none`;
    fetch(`/weather?address=${location}`).then( (response)=>{
        response.json().then( (data)=>{
            if(data.error) return messageOne.textContent = data.error;
            console.log(data.body)
            icon.setAttribute(`src`, data.body.weather_icons[0]);
            icon.classList = `display-block`;
            messageOne.textContent = data.location;
            messageTwo.innerHTML = data.forecast;
        })
    })
})