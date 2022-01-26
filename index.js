const { readInput } = require('./helpers/inquirer')

require('colors')


const main = async() => {
  const text = await readInput('Hola: ');

  console.log(text);
}


main()