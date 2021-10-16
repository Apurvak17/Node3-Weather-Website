const request=require('request')
const geolocation=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXBwdWsiLCJhIjoiY2t1aWIzY3EwMDg2bDJ6cDZ5ZW9tcXJ3byJ9.UA2ebZeAj3o9qKNRPWl2Qg&limit=1%22'
    
    request({url,json:true},(error,{body}={})=>{
        
    if(error)
    {
        callback('Unable to call Service',undefined)
    }
    else if(body.features.length==0)
    {
        callback(undefined,'Opps invalid request')
    }
    else
    {
        callback(undefined,{Place: body.features[0].place_name,
            Longitude: body.features[0].center[0],
            Latitude: body.features[0].center[1]})
    }
    })
}

const forecast=(a,b,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=7b7fdf7284d9c7a23931749e91a01af0&query='+a+','+b
    request({url,json:true},(error,{body}={})=>{
        if(error)
        {
            callback('Unable to connest to service',undefined)
        }
        else if(body.error)
        {
            callback('Invalid Request please try again',undefined)
        }
        else
        {
            callback(undefined,body.current.weather_descriptions[0])
        }
    })
}

module.exports={
    geolocation,
    forecast
}