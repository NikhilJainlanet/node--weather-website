const request = require("request")

const forcast=(address, callback)=>{
    console.log(address)
    const url ="http://api.weatherstack.com/current?access_key=d69a734e06c051b6c8f8e5beb04450c3&query="+address
    request({ url, json: true }, (error, {body}) =>{
        if(error){
                  callback("unable to connect whether services",undefined)
                }
                else if(body.error){
                 callback("Unable to find location",undefined)
            
                }
                else{
               callback(undefined,"It is currently "+body.current.temperature+" degree out.There is "+body.current.precip+" % chance of rain")
             }})
    
}
module.exports=forcast