const path= require('path')
const express= require('express')
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app=express()

//Define path foe express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup hendelsbar engine and views loaction
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=> {
    res.render('index',{
        title: 'Weather',
        name: 'ori'
    })
})

app.get('/help', (req,res)=> {
    res.render('help',{
        title: 'Help',
        name: 'ori'
    })
})

app.get('/about', (req,res)=> {
    res.render('about',{
        title: 'About',
        name: 'ori'
    })
})

app.get('/weather', (req,res)=>{
    console.log(req.query.address)
    if(!req.query.address)
    {
        return res.send('Not access adress!')
    }
    geocode(req.query.address, (error, { latitude, longitude, location  }={}) =>{
            if(error)
            {
                return res.send({error})
            }
            forecast(latitude, longitude , (error, forecastData)=>{
                if(error)
                {
                    return res.send({error})
                }
                res.send({
                    forecast : forecastData,
                    location,
                    address: req.query.address
                })
            })
        })


})

app.get('/help/*', (req,res)=> {
    res.render('404',{
        title: 'help',
        name: 'ori',
        messege:'Article Not Found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'ori',
        messege:'Page Not Found'
    })})

app.listen(3000),() => {
    console.log("server on port 3000")
}