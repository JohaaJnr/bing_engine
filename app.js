const express = require('express')
const path = require('path')
const Routes = require('./routes/Route')
const dotenv = require('dotenv')
const puppeteer = require('puppeteer')
const app = express()



dotenv.config({path: './config.env'})
const Port = process.env.PORT || 8000

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('views', './views')
app.set('view engine', 'ejs')


app.use('/', Routes)


app.listen(Port, (req,res)=>{
    console.log(`Application running on Port: ${Port}`)
})