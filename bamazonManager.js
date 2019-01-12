const BamazonOperations = require('./BamazonOperations')
      inquirer = require('inquirer'),
      managerOperations = new BamazonOperations(managerIntiate);

function managerIntiate(){
    managerOperations.getDataProductTable(managerPrompt);
}

// function that exits the app
function exitApp(){
    process.exit()
}

// function to prompt the manager to select an option.
function managerPrompt(ProductTable){
    inquirer
    .prompt([
        {
            type: 'rawlist',
            name: 'option',
            message: 'Select your Option: '.white,
            choices: ['View Products for Sale','View Low Inventory','Add to Inventory','Add New Product','Exit']
        }
    ])
    .then(optionResponse => {
    
        switch (optionResponse.option){
            case 'View Products for Sale' : managerOperations.displayProductTable(ProductTable)
                                            managerPrompt(ProductTable)
                                            break;
            case 'View Low Inventory'     : managerOperations.getLowInventory(ProductTable)
                                            managerPrompt(ProductTable)
                                            break;
            case 'Add to Inventory'       : addInventoryPrompt()
                                            break;
            case 'Add New Product'        : addNewProductPrompt()
                                            break;
            case 'Exit'                   : managerOperations.exit(exitApp)
                                            break;
        }
    });
}

// function to prompt manager to add to inventory
function addInventoryPrompt(){
    inquirer
    .prompt([ 
        {
            type: 'input',
            name: 'id',
            message: 'Enter the product ID: '.white,
            validate: input => {
                if(isNaN(input) || input < 1) return 'Enter a positive number'
                if(!managerOperations.findProduct(input)) return 'Enter a valid product ID'
                return true
            }
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'Enter the quantity you would like to add: '.white,
            validate: input => {
                if(isNaN(input) || input < 1) return 'Enter a positive number'
                return true
            }
        }
    ])
    .then(optionResponse => {
        managerOperations.addToProductInventory(optionResponse.id,optionResponse.quantity,managerIntiate)
    }); 
}

// function to prompt manager to add New product to the product Table
function addNewProductPrompt(){
    
    managerOperations.getDataDepartmentTable((res) => {

        let departmentArray = res.map((data)=> data.department_name).sort()
        inquirer
        .prompt([
            {
                type: 'input',
                name: 'product',
                message: 'Enter the Product Name: '.white,
                validate: input =>{
                        if(!input) return 'Required field'.red
                        return true
                }
            },
            {
                type: 'list',
                name: 'department',
                message: 'Choose the department: '.white,
                choices: departmentArray
            },
            {
                type: 'input',
                name: 'price',
                message: 'Enter the price of the product: '.white,
                validate: input =>{
                    if(isNaN(input) || input < 1) return 'Enter a valid price'
                    if(!input) return 'Required field'
                    return true
                }
            },
            {
                type: 'input',
                name: 'stock',
                message: 'Enter the stock quantity: '.white,
                validate: input =>{
                    if(isNaN(input) || input < 1) return 'Enter a positive number as quantity'
                    if(!input) return 'Required field'
                    return true
                }
            }

        ])
        .then(optionResponse =>{
            managerOperations.addNewProduct(optionResponse.product,optionResponse.department,optionResponse.price,optionResponse.stock,managerIntiate)
        })
    })
}