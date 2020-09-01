const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shashwat'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Shashwat'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        help_text: 'This is help message',
        title: 'Help',
        name: 'Shashwat'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "Address mustbe provided"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {  //section 6 episode 40
        if(error) {
            return res.send({error})
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        error: 'Help article not found',
        name: 'Shashwat'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found',
        name: 'Shashwat'
    })
})

app.listen(3000, () => {
    console.log('Server is on port 3000')
})