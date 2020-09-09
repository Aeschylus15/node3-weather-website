const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=64edfd8256cb38604c5e8c2537707abc&query='+latitude+','+longitude+'&units=f'

    //console.log(url)
    request({url, json: true}, (error,{body} = {}) => {
        if(error) {
            callback("Unable to connect to weather services", undefined)
        }
        else if(body.error) {
            callback("Unable to find location", undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0]+". It is currently "+body.current.temperature +
            " degrees out. There is " + body.current.precip+"% chance of rain. The humidity is " + body.current.humidity + "%.")
            //console.log(response.body.current)
        }
    })
}

module.exports = forecast