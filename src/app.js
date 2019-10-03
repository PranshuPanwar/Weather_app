const path = require('path');
const express = require('express');
const hbs = require('hbs');
const getcode = require('./utils/getcode');
const forecast = require('./utils/forecast');

const app = express();
const port=process.env.PORT||3000;

const directorypath= path.join(__dirname,'../public');

const viewpath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//console.log(partialsPath);
app.set('view engine','hbs');
app.set('views',viewpath);
hbs.registerPartials(partialsPath);

// to customize the server
app.use(express.static(directorypath));



app.get('',(req ,res)=>{
  //  res.send('<h1>Hello</h1>')
    res.render('index',{
        title : 'Weather App',
        name :'Pranshu Panwar'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title :'About me',
        name : 'Pranshu Panwar'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        services:'How we can help you',
        name:'Pranshu Panwar'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please provide the address"
        })
    }

    getcode(req.query.address, (error ,{latitude, longitude,place}={})=>{
        if(error){
           return res.send({
                error : error
            })

 }
     forecast(latitude, longitude, (error , {temp,humidity,summary}={})=>{
         if(error){
             res.send({
                 error
             })
         }

         res.send({
             temp,
             humidity,
             address:req.query.address,
             place,
             summary
         })
     })
    })
    
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
      return  res.send({
            error:"Error no query found"
        })
    }
    console.log(req.query.search);
    res.send({
        product:[]
    })
})

app.get('/help/*', (req,res)=>{
    res.render('error',{
        title : 404,
        error : "Help Article Not found",
        name :'Pranshu Panwar'
    })
})

app.get('*', (req,res)=>{
    res.render('error',{
        title :404,
        error:'404 Page Not Found',
        name :'Pranshu Panwar'
    })
    
})


app.listen(port, ()=>{
    console.log('Server is running at port '+ port);
})