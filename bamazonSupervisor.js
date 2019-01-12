const BamazonOperations = require('./BamazonOperations'),
      inquirer = require('inquirer'),
      supervisorOperations = new BamazonOperations(Supervisorinitiate)

function Supervisorinitiate(){
    supervisorOperations.getDataDepartmentTable(supervisorPrompt)
}

// function that exits the app
function exitApp(){
    process.exit()
}

// function to prompt the supervisor to select an option.
function supervisorPrompt(departmentTable){

    inquirer
    .prompt([
        {
            type: 'rawlist',
            name: 'option',
            message: 'Select your option: '.white,
            choices: ['View Departments table','View Product Sales by Department','Create New Department','Exit']
        }
    ])
    .then(optionResponse =>{
        switch(optionResponse.option) {
            case 'View Departments table':  supervisorOperations.displayDepartmentTable(departmentTable)
                                            supervisorPrompt(departmentTable)
                                            break;
            case 'View Product Sales by Department': supervisorOperations.getProductSaleDept(supervisorPrompt)
                                                     break;
            case 'Create New Department': addNewDepartmentPrompt()
                                          break;
            case 'Exit' : supervisorOperations.exit(exitApp)
        }
    });
}

// function to prompt supervisor to add new department
function addNewDepartmentPrompt(){
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter the Department Name: '.white,
            validate: input =>{
                if(!input) return 'Required field'
                return true
            }
        },
        {
            type: 'input',
            name: 'overhead',
            message: 'Enter the overhead costs'.white,
            validate: input =>{
                if(!input) return 'Required field'
                if(isNaN(input)) return 'Enter valid cost value'
                return true
            }
        }
    ])
    .then(optionResponse =>{
        supervisorOperations.addNewDepartment(optionResponse.department,optionResponse.overhead,Supervisorinitiate)
    })

}


