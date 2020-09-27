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
            const {weather_descriptions:descr, temperature, feelslike, humidity } = current;
            callback(undefined, `${descr[0]}.  It is currently ${temperature}°<sup>F</sup> outside, it feels like ${feelslike}°<sup>F</sup> outside, and the humidity is ${humidity}%`, current);
        }
    })
}

module.exports = forecast