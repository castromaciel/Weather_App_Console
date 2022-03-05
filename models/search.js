const axios = require('axios')
const MAPBOX_KEY = process.env.MAPBOX_KEY 
const WEATHERMAP_KEY = process.env.WEATHERMAP_KEY
class Searchs {
  history = ['San Miguel de Tucumán', 'Bogotá', 'San José']

  constructor() {
    //Todo: leer db si existe
  }

  get paramsMapbox(){
    return {
      'access_token': MAPBOX_KEY,
      'limit': 5,
      'language': 'en'
    }
  }

  async city( place = '' ){

    try {

      const instance = axios.create({
        baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${ place }.json?`, 
        params: this.paramsMapbox
      }) 

      const resp = await instance.get();
      return resp.data.features.map( place => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1]
      }))

    } catch (error) {
      return []; 
        
    }
  }


  get paramsWeatherMap(){
    return {
      'appid': WEATHERMAP_KEY,
      'units': 'metric',
      'language': 'en',
    }
  }

  async weatherPlace( lat, lon){
    try {

      const instance = axios.create({
        baseURL:`https://api.openweathermap.org/data/2.5/weather`, 
        params: {...this.paramsWeatherMap, lat, lon}
      })
      //resp.data
      const resp = await instance.get();
      
      return{
        description: resp.data.weather[0].description,
        temp: resp.data.main.temp,
        min: resp.data.main.temp_min,
        max: resp.data.main.temp_max,
      }
      
    } catch (error) {
      console.error(error)
    }
  }

}

module.exports = { Searchs }