require('dotenv').config()
const axios = require('axios')
const MAPBOX_KEY = process.env.MAPBOX_KEY 

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
      console.log(resp.data)

      return []; // return cities

    } catch (error) {
      return []; 
        
    }
    
  }

}

module.exports = { Searchs }