const inquirer = require('inquirer'),
      BamazonOperations = require('./BamazonOperations'),
      customerOperations = new BamazonOperations(initiate),
      NOT_ENOUGH_STOCK_MSG = 'Insufficient quantity!';

// function to get data from database.
function initiate(){
  customerOperations.getDataProductTable(promptCustomerBuy);
}

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
    
      let selectedProduct = customerOperations.findProduct(customerResponse.id)

      // checking for quantity in database.
      if(selectedProduct.stock_quantity < customerResponse.quantity){
        console.log('%'.repeat(NOT_ENOUGH_STOCK_MSG.length).red)
        console.log(NOT_ENOUGH_STOCK_MSG.red)
        console.log('%'.repeat(NOT_ENOUGH_STOCK_MSG.length).red)
        promptCustomerBuy(productTable)
      }
      else{
        customerOperations.updateProductTable(selectedProduct.item_id,customerResponse.quantity,selectedProduct.price,promptCustomerBuy)
      }
    });
}