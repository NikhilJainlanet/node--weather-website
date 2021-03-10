const request = require("request")


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmlraGlsamFpbi1sYW5ldCIsImEiOiJja20xaXBxbTMwdmE5MnVyM2kzb21wMnh4In0.pGfso6jHDdP4H1xcxOEFUA'
    request({  url, json: true }, (error, {body}) => {
      if (error) {
        callback("Unable to connect to Location service", undefined)
      }
      else if (body.features.length === 0) {
        callback("Unable to find location", undefined)
      }
         else{
           callback(undefined,{
             latitude:body.features[0].center[1],
             longitude:body.features[0].center[0],
             location:body.features[0].place_name
           })
         }
       })
  }  
  module.exports=geocode