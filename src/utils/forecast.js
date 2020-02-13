const request = require('request')

const forecast = (lon,lat, callback) => {
    const url = 'https://api.darksky.net/forecast/aed5a9fb430975423820fbed3a87164a/'+lon+','+lat+'?&units=si'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!',undefined)
        } else if (response.body.error) {
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')   
        }
    })
}

module.exports = forecast