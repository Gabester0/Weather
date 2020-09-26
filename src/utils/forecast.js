const request = require(`postman-request`);

const forecast = (latitude, longitude, callback)=>{
    const lat = encodeURIComponent(latitude)
    const long = encodeURIComponent(longitude)
    const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_KEY}&query=${lat},${long}&units=f`;
    request({ url, json: true }, (error, {body})=>{
        const {error:bodyError, current} = body;
        if(error){ 
            callback(error, undefined)
        } else if(error){
            callback(`Unable to find location, please check coordinates and try again.`, undefined)
        }else {
            const {weather_descriptions:descr, temperature, feelslike } = current;
            callback(undefined, `${descr[0]}.  It is currently ${temperature} degrees outside and it feels like ${feelslike} degrees outside`, current);
        }
    })
}

module.exports = forecast