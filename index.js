require('dotenv').config()
const { inquirerMenu, pause, readInput, listPlaces } = require('./helpers/inquirer');
const { Searchs } = require('./models/search');
require('colors')

const main = async() => {

  const searchs = new Searchs();
  let opt;

  do { 
    opt = await inquirerMenu();

    switch(opt){
      case 1:
        //show message
        
        const search_term = await readInput('City or Place: ');
        
        //search places

        const places = await searchs.city( search_term );
        
        //select

        const selected_id = await listPlaces( places );
        const selected_place = places.find( place => place.id === selected_id)
        const { name, lat, lng } = selected_place


        //Get weather

        const weather = await searchs.weatherPlace( lat, lng )
        const { description, temp, max, min } = weather

        //Show results
        console.log('\nInformación de la ciudad\n'.green)
        console.log('City: ', name.green)
        console.log('Latitude: ', `${lat}`.green)
        console.log('Longitude: ', `${lng}`.green)
        console.log('temperature: ', `${temp}°C`.green)
        console.log('Min: ', `${min}°C`.green)
        console.log('Max: ', `${max}°C`.green)
        console.log('Description: ', description.green)

      break;
      case 2:
        console.log('Reading History')        
      break;
      case 0:
        // Here the opt changes and the main function stop.
      break;
    }

    await pause();

  } while(opt !== 0);
}


main()