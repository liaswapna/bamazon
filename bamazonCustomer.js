const inquirer = require('inquirer'),
      NOT_ENOUGH_STOCK_MSG = 'Insufficient quantity!';

// prompt for customer to buy items.
function promptCustomerBuy(productTable){
  customerOperations.displayProductTable(productTable)

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'id',
        message: 'Enter the product ID or (press q to exit)'.white,
        validate: input => {

          if(input.toLowerCase() === 'q'){
            process.exit()
          }
          if(isNaN(input)){
            return 'Please enter a number'.white
          }
          if(!customerOperations.findProduct(input)){
            return 'Please enter a valid product ID'
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'quantity',
        message: 'Enter the quantity you like to purchase (press q to exit)'.white,
        validate: (input) => {

          if(input.toLowerCase() === 'q'){
            process.exit()
          }
          if(isNaN(input) || input < 1){
            return 'Please enter positive integer'
          }
          return true
          
        }
      }
    ])
    .then(customerResponse => {
    
      
    });
}
promptCustomerBuy(productTable)