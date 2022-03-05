const inquirer = require('inquirer');
require('colors')

const questions = [
  {
    type: 'list',
    name: 'options',
    message: '¿What do yo want to do?',
    choices: [
      {
        value: 1,
        name: `${'1.'.green} Search City`
      },
      {
        value: 2,
        name: `${'2.'.green} History`
      },
      {
        value: 0,
        name: `${'0'.red}. Exit`
      },
    ]
  }
]

const pauseOptions = [
  {
    type: 'input',
    name: 'pause',
    message: `Presione ${ 'enter'.green } para continuar` 
  }
];

const inquirerMenu = async() => {

  console.log('========================='.green);
  console.log('  SELECCIONE UNA OPCION  ');
  console.log('=========================\n'.green);

  const {options} = await inquirer.prompt(questions);

  return options
}

const pause = async() => {
  
  console.log('\n');
  await inquirer.prompt(pauseOptions);

}

const readInput = async(message) => {
  const question = [
    {
      type: 'input',
      name: 'city',
      message,
      validate( value ){
        if( value.length === 0) return 'Please write a city or a place'
        return true;
      }
    }
  ]

  const { city }= await inquirer.prompt(question);
  return city
}

const taskListDelete = async( tasks = [] ) => {
  const choices = tasks.map( (task, index) => {
    
    i = `${index +1}.`.green

    return {
      value: task.id,
      name: `${i} ${task.description}`
    }
  });

  choices.unshift({
    value: '0',
    name: '0. '.green +'Cancel'
  })
  
  const question = [
    {
      type: 'list',
      name: 'id',
      message: 'Delete',
      choices
    }
  ]

  const { id } = await inquirer.prompt(question);

  return id

}

const confirm = async(message) =>{

  const question = [ 
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];

  const { ok } = await inquirer.prompt( question )
  return ok
}

const showChecklist = async( tasks = [] ) => {
  const choices = tasks.map( (task, index) => {
    
    i = `${index +1}.`.green

    return {
      value: task.id,
      name: `${i} ${task.description}`,
      checked: ( task.completedIn ) ? true : false
    }
  });

  choices.unshift({
    value: '0',
    name: '0. '.green +'Cancel'
  })
  
  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selects',
      choices
    }
  ]

  const { ids } = await inquirer.prompt(question);

  return ids

}


module.exports = { inquirerMenu, pause, readInput, taskListDelete, confirm, showChecklist }