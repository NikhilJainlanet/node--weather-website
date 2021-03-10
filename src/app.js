const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const { log } = require('console');
const geocode = require('../src/utils/geocode')
const forcast = require("../src/utils/forcast")
//Define paths for express config

///definess paths for express config
const publicdirectory = (path.join(__dirname, '../public'));
const viewspath = path.join(__dirname, '../template/views');
const partialspath = path.join(__dirname, '../template/partials')

///setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewspath);
hbs.registerPartials(partialspath);

//setup static directory to serve
app.use(express.static(publicdirectory))

app.get("", (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "nikhil"
    })
})
app.get("/about", (req, res) => {
    res.render('about', {
        title: "about us",
        name: "nikhil"
    })
})
app.get("/help", (req, res) => {
    res.render('help', {
        title: "Help",
        name: "nikhil"
    })
})


// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })
// app.get('/help', (req, res) => {
//     res.send([{
//         name:"nikhil"},
//         {name:"sera"}
//     ])
// })
// app.get('/about', (req, res) => {
//     res.send("<h1>About Page</h1>")
// })
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:"you must provide a search term"
        })
    }
    //console.log(req.query.address)
        // forcast: "Clear Day",
        // location: "Udaipur",
        // address:req.query.address

        geocode(req.query.address, (error,{location}={}) => {
            if (error) {
              return res.send({error})
            }
        forcast(location, (error, forecastdata) => {
              if (error) {
                return res.send(error)
              }
              res.send({location,
              forecast:forecastdata,
            address:req.query.address})
            })
          })
        })
    


app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"you must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        product:[]
    })
})
app.get('/help/*',(req,res)=>{
        res.render('404',{
        title: "404",
        name: "nikhil",
        errormsg:"Help Article not found"}
    )})
app.get('*',(req,res)=>{
    res.render('404',{
        title: "404",
        name: "nikhil",
        errormsg:"Page not found"
    }
)})

app.listen(3000, () => {
    console.log("server is up on port 3000")
})