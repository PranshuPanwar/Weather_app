const request = require('request');

const forescast = ( latitude ,longitude, callback)=>{
    const url ="https://api.darksky.net/forecast/930358e11e7c325f50f5fda66d7e6c36/"+latitude+","+longitude;
    request({url : url , json: true}, (error , {body})=>{
        if(error){
            callback("Unable to make the request", undefined);
        }else if(body.error){
            callback('The location not found please try again', undefined);
        }else{
            callback(undefined , data={
                summary : body.daily.data[0].summary,
                temp : body.currently.temperature,
                humidity : body.currently.humidity
            })
        }
    })
}

module.exports= forescast;