require('dotenv').config();
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express();

//Define paths for express config
const PublicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, `../templates/views`);
const partialsPath = path.join(__dirname, `../templates/partials`);

//Set up geocode and forecast api calls with request
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const request = require('postman-request');

//Setup handlebars engine and views configuration
app.set(`view engine`, `hbs`)
app.set(`views`, viewsPath)
hbs.registerPartials(partialsPath)

//Setup Express to serve static assets from public directory (PublicDirectoryPath)
app.use(express.static(PublicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: `Weather App`,
        name: `Chron Bot`
    })
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title: `About Me`,
        name: `Chron Bot`
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "Error, you must input a location to search for"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {} )=>{
        if(error) return res.send({error})
    
        forecast(latitude, longitude, (error, forecastData, current) => {
            if(error) return res.send({ error })

            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address,
                body: current
            })
        })
    })
});

app.get('/details', (req, res)=>{
    res.render('details', {
        title: 'Weather Details',
        name: 'Chron Bot'
    })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: [],
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: `Help Page`,
        message: `This is a help page`,
        name: `Chron Bot`
    })
})

app.get('/help/*', (req, res)=>{
    res.render(`404`, { 
        error: `Pardon our 404.  We can't seem to find the help article you were looking for.`,
        title: `Help Page 404`,
        name: `Chron Bot`
     })
})

app.get('*', (req, res)=>{
    res.render(`404`, { 
        error: `Pardon our 404.  We can't find the page your are looking for.`,
        title: `404`,
        name: `Chron Bot`
    })
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Express server is listening on port 3000`)
})