const { inquirerMenu, pause, readInput } = require('./helpers/inquirer');
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
        const place = await readInput('Ciudad: ');
        await searchs.city( place );
        //search places

        //select
        
        //Get weather

        //Show results
        console.log('\nInformación de la ciudad\n'.green)
        console.log('Ciudad: ',)
        console.log('Lat: ',)
        console.log('Longitud: ',)
        console.log('Temperatura: ',)
        console.log('Mín: ',)
        console.log('Máx: ',)

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