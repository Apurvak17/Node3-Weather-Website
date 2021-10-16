const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geo=require('./utils/geocode')

// console.log(__filename)
// console.log(__dirname)
// console.log(path.join(__dirname,'/public'))

//static directory to serve
const pathoffile=path.join(__dirname,'../Public')
const app=express()
//define path for Express Config
const viewpath=path.join(__dirname,'../Template/views')
const partialpath=path.join(__dirname,'../Template/partials')


app.set('view engine','hbs')
app.set('views',viewpath)

hbs.registerPartials(partialpath)
console.log(partialpath)

app.use(express.static(pathoffile))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Appu k',
        name:'Apurva'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Kulkarni'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        Message:'Hello May I know How Can I helpp You',
        name:'Appu'
    })
})


app.get('/help',(req,res)=>{
    res.send('<h1>Welcome to Help</h1>')
})

app.get('/about',(req,res)=>{
    res.send('<h1>Welcome to About</h1>')
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
       return res.send({Error:'Address must be provided'})
    }    
    
    geo.geolocation(req.query.address,(err,{Place,Longitude,Latitude}={})=>{
        if(err)
        {
            return res.send({err})
        }
        geo.forecast(Longitude,Latitude,(err,fdata)=>{
            if(err)
            {
                return res.send({err})
            }
            res.send({
                data:fdata,
                Longitude:Longitude,
                Latitude:Latitude,
                Location:Place,
                Address:req.query.address
            })

        })
    })
    // res.send({
    //     Forecast:35,
    //     Location:'Solapur',
    //     Address:req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
       return res.send({Error:'Search value much be provided'})
    }

    console.log(req.query.search)
    res.send({products:[]})
})


app.get('/help/*',(req,res)=>{
    res.render('all',{
        header:'Help file Page Not Found',
        Errormessage:'Help file Page Not Found 404 Error',
        name:'Created By Apurva Kulkarani'
    })
})

app.get('*',(req,res)=>{
    res.render('all',{
        header:'Page Not Found',
        Errormessage:'404 Error',
        name:'Apurva Kulkarni'
    })
})

app.listen(3000,()=>{
    console.log('Server is up Running!!')
})