const request = require(`postman-request`);


const geocode = (address, callback)=>{
    const encodedAddress = encodeURIComponent(address)
    const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${process.env.MAPBOX_KEY}&limit=1`
    request({url: mapboxUrl, json: true}, (error, {body})=>{
        const { features } = body;
        if(error){
            callback(`Unable to connect to location services`, undefined)
        } else if(!features[0]){
            callback(`Unable to find coordinates, invalid input`)
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode;